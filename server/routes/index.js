const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const entertainmentRouter = require('./entertainmentRouter')
const FavouriteController = require('../controller/favouriteController')
const authenticate = require('../middleware/auth')

router.use('/user', userRouter)

router.use('/entertainment', entertainmentRouter)

router.use(authenticate)
router.get('/favourite', FavouriteController.getFavourite)
router.post('/favourite', FavouriteController.addFavourite)
router.delete('/favourite', FavouriteController.deleteFavourite)


module.exports = router