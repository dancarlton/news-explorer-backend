const express = require('express')

const router = express.Router()

const {
  getArticles,
  saveArticle,
  getSavedArticles,
  deleteArticle,
} = require('../controllers/articleController')
const auth = require('../middleware/auth')

router.get('/', getArticles)
router.post('/saved-news', auth, saveArticle)
router.get('/saved-news', auth, getSavedArticles)
router.delete('/:articleId', auth, deleteArticle)

module.exports = router
