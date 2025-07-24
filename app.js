const express = require('express')
const cors = require('cors')
// const helmet = require('helmet');
// const limiter = require('./middleware/rateLimiter');

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

const routes = require('./routes')

app.use('/api', routes)

module.exports = app
