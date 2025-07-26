const express = require('express')

const router = express.Router()

const { getArticles, saveArticle} = require('../controllers/articleController')
const auth = require('../middleware/auth')

router.get('/', getArticles)
router.post('/saved-news', auth, saveArticle)

module.exports = router
