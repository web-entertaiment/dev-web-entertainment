const router = require('express').Router()
const EntertainmentController = require('../controller/EntertainmentController')

router.get('/comics', EntertainmentController.getComics)

module.exports = router