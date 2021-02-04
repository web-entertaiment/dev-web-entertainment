const express = require('express')
const router = express()
const userRouter = require('./userRouter')
const entertainmentRouter = require('./todoRouter')

router.use('/user', userRouter)
router.use('/entertainment', entertainmentRouter)

module.exports = router