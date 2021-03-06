const express = require('express')
const router = express.Router()
const userRouter = require('./userRouter')
const entertainmentRouter = require('./entertainmentRouter')

router.use('/user', userRouter)
// router.get('/favourite', FavouriteController)
router.use('/entertainment', entertainmentRouter)

module.exports = router