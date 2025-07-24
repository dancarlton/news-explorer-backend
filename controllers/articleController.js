const BadRequestError = require('../errors/BadRequestError')
const Article = require('../models/Articles')

// const formattedDate = new Date().toISOString().slice(0, 10)

// GET /articles
// get all articles from news api
exports.getArticles = async (req, res, next) => {
  try {
    const search = req.query.q
    console.log('search query:', search)
    if (!search) {
      throw new BadRequestError('Search query is required.')
    }

    const response =
      await fetch(`https://newsapi.org/v2/everything?q=${search}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}
      `)

    const data = await response.json()

    res.status(200).json(data)
  } catch (err) {
    console.log('Error fetching news articles')
    next(err)
  }
}

// GET /articles
// get saved articles

// POST /articles
// save an article

// DELETE /articles/:id
// removes an article from their favorites
