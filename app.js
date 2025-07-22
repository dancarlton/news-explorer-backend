const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middleware/rateLimiter');

require('dotenv').config();

const app = express();
