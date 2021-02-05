const { User } = require('../models/index')
const { comparePass } = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')


class UserController {
    static register(req, res, next){
        console.log(req.body)
        let fullName = req.body.fullName || ''
        let email = req.body.email || ''
        let password = req.body.password || ''
        User.create({fullName, email, password})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static login(req,res,next){
        let email = req.body.email
        let password = req.body.password
        User.findOne({where: {email}})
        .then(user => {
            if(!user || user === null ) throw {name: 'NotFoundError', msg: 'Email / Password is Invalid'}
            let comparedPass = comparePass(password, user.password)
            if(comparedPass){
                let token = generateToken({id: user.id, email: user.email})
                res.status(200).json({access_token: token})
            }else{
                throw {name: 'JsonWebTokenError', msg: 'Email / Password is Invalid'}
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static googleLogin(req, res, next) {
        const { id_token } = req.body
        let objUser
        const CLIENT_ID = process.env.CLIENT_ID 
        const client = new OAuth2Client(CLIENT_ID);
        client.verifyIdToken({
            idToken: id_token,
            audience: CLIENT_ID,  
        })
        .then(ticket => {
            const payload = ticket.getPayload();
            objUser =  {
                fullName: payload.name, 
                email: payload.email,
                password: String(Math.random()*1000)
            }
            return User.findOne({where: {email: objUser.email}})
        })
        .then(data => {
            if (!data) {
                return User.create(objUser)
            } else {
                return data
            }
        })
        .then(data => {
            let payload = { 
                id: data.id,
                email: data.email 
            } 
            const access_token = generateToken(payload)  
            return res.status(200).json({access_token: access_token})
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = UserController