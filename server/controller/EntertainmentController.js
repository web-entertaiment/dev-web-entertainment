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
        let data = comic.filter(el => {if (el.img && el.img !== null ) return el})
        let finalData = data.map(el => { 
          return {
            title: el.title,
            description: el.description,
            url: el.url,
            img: `${el.img.path}/detail.jpg`
          }
        })
        res.status(200).json(finalData)
      })
      .catch( err => {
        next(err)
      })
  }

    static getAnime(req, res, next){
        let query = req.query.search
        axios.get(`https://api.jikan.moe/v3/search/anime/?q=${query}&page=1`)
        .then(response => {
          let anime = response.data.results.map(el => { 
            return {
              title: el.title,
              description: el.synopsis,
              url: el.url,
              img: el.image_url
            }
          })
            res.status(200).json(anime)
        })
        .catch(err => {
            next(err)
        })
    }

  static getMovie(req, res, next) {
    
    const api_key_movie = process.env.APIKEY_MOVIE
    axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${api_key_movie}`)
    .then(response => {
      res.status(200).json(response.results)
      //akses gambar tambah https://image.tmdb.org/t/p/w500/{link gambar}
    })
    .catch(err => {
      next(err)
    })

  }


}

module.exports = EntertainmentController