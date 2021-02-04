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
            let comparedPass = comparePass(password, user.password)
            if(!user) throw {msg: 'Email / Password is Invalid'}
            if(comparedPass){
                let token = generateToken({id: user.id, email: user.email})
                res.status(200).json({id: user.id, email: user.email, token})
            }else{
                throw {msg: 'Email / Password is Invalid'}
            }
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController