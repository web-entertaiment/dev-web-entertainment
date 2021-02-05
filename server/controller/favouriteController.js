const {Favourite, User} = require('../models/index')

class FavouriteController {
    static getFavourite(req, res, next){
        let UserId = req.decoded.id
        Favourite.findAll({
            where: {UserId}
        })
        .then((data => {
            res.status(200).json(data)
        }))
        .catch((err) => {
            next(err)
        })
    }

    static addFavourite(req, res, next){
        let UserId = req.decoded.id
        let {category} = req.body
        let {title} = req.body
        let {synopsis} = req.body
        let {imgUrl} = req.body
        Favourite.create({UserId, category, title, synopsis, imgUrl})
        .then((data => {
            res.status(200).json(data)
        }))
        .catch((err) => {
            next(err)
        })
    }
    
    static deleteFavourite(req, res, next){
        let UserId = req.decoded.id
        Favourite.destroy({where: {UserId}})
        .then((data => {
            res.status(200).json(data)
        }))
        .catch((err) => {
            next(err)
        })
    }
}

module.exports = FavouriteController