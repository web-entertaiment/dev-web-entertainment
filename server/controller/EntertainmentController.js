const axios = require('axios')

class EntertainmentController {
  static getComics (req, res, next){
    let ts = process.env.TS
    let apikey_marvel = process.env.APIKEY_MARVEL
    let hash_api_marvel = process.env.HASH_API_MARVEL
    const marvelComics = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${apikey_marvel}&hash=${hash_api_marvel}`
    
    axios.get(marvelComics)
      .then( response => {
        let comic = response.data.data.results.filter((el) => el.description !== null).map((el) => {
          return {
            title: el.title,
            description: el.description,
            url: el.urls[0].url,
            img: el.images[0]
          }
        })
        res.status(200).json(comic)
      })
      .catch( err => {
        next(err)
      })
  }

}

module.exports = EntertainmentController