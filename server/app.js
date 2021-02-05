if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}
const express =  require('express')
const app = express()
const port = 3000
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
const router = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Running on port ${port}`);
})