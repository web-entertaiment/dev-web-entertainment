const router = require('express').Router()
const EntertainmentController = require('../controller/EntertainmentController')

router.get('/comics', EntertainmentController.getComics)
router.get('/animeMovie', EntertainmentController.getAnime)

module.exports = router