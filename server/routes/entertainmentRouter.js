const router = require('express').Router()
const EntertainmentController = require('../controller/EntertainmentController')

router.get('/comics', EntertainmentController.getComics)
router.get('/animes', EntertainmentController.getAnime)
router.get('/movies', EntertainmentController.getMovie)

module.exports = router