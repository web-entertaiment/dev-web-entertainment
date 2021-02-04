const axios = require('axios')

class EntertainmentController {
    static getAnime(req, res, next){
        let query = req.query.search
        axios.get(`https://api.jikan.moe/v3/search/anime/?q=${query}&page=1`)
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            next(err)
        })
    }

}

module.exports = EntertainmentController