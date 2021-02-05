const {User} = require('../models/index')
const { comparePass } = require('../helper/bcrypt')
const {generateToken} = require('../helper/jwt')

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
        const client = new OAuth2Client(process.env.CLIENT_ID) 
        let fullName = ""
        let email = ""
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                fullName = payload.name
                email = payload.email

                return User.findOne({where: {email}}) 
            })
            .then(user => {
                if(user) {
                    const access_token = generateToken({
                        id: registeredUser.id,
                        email: registeredUser.email
                    })
                    res.status(200).json({access_token})
                } else {
                    return User.create({
                        fullName,
                        email,
                        password: "littlefoxes"
                    })
                }
            })
            .then(registeredUser => {
                const access_token = generateToken({
                    id: registeredUser.id,
                    email: registeredUser.email
                })
                res.status(201).json({access_token})
            })
            .catch(err => {
                console.log(err)
            })
    }
}

module.exports = UserController