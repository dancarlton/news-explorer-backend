const BadRequestError = require('../errors/BadRequestError')
const NotFoundError = require('../errors/NotFoundError')
const Article = require('../models/Articles')
const User = require('../models/Users')

const toDate = new Date().toISOString().slice(0, 10)
const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  .toISOString()
  .slice(0, 10)

// GET /articles
// get all articles from news api
exports.getArticles = async (req, res, next) => {
  try {
    const search = req.query.q
    if (!search) {
      throw new BadRequestError('Search query is required.')
    }

    const response =
      await fetch(`https://newsapi.org/v2/everything?q=${search}&from=${fromDate}&to=${toDate}&sortBy=popularity&apiKey=${process.env.NEWS_API_KEY}
      `)

    const data = await response.json()

    res.status(200).json(data)
  } catch (err) {
    console.log('Error fetching news articles')
    next(err)
  }
}

// POST /articles
// save articles
exports.saveArticle = async (req, res, next) => {
  try {
    const userId = req.user._id

    if (!userId) {
      throw new NotFoundError('User ID not found')
    }

    const savedArticle = await Article.create({
      ...req.body,
      owner: userId,
    })

    await User.findByIdAndUpdate(userId, {
      $push: { savedArticles: savedArticle._id },
    })

    res.status(201).json(savedArticle)
  } catch (err) {
    console.log('Error saving news article')
    next(err)
  }
}

// GET /articles
// get saved articles
exports.getSavedArticles = async (req, res, next) => {
  try {
    const userId = req.user._id

    const savedArticle = await Article.find({ owner: userId })

    if (!savedArticle) {
      throw new NotFoundError('No saved articles found')
    }

    res.status(200).json(savedArticle)
  } catch (err) {
    console.log('Error getting saved article')
    next(err)
  }
}

// DELETE /articles/:id
// removes an article from their favorites
exports.deleteArticle = async (req, res, next) => {
  try {
    const articleId = req.params.articleId

    // const deletedArticle = await Article.findOneAndDelete({ _id: articleId })
    const deletedArticle = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { savedArticles: articleId } },
      { new: true }
    )

    if (!deletedArticle) {
      throw new NotFoundError('No article found')
    }

    res.status(200).json({ message: 'Article deleted', _id: articleId })
  } catch (err) {
    console.log('Error getting saved article')
    next(err)
  }
}
