const BadRequestError = require('../errors/BadRequestError')
const Article = require('../models/Articles')

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

// GET /articles
// get saved articles

// POST /articles
// save an article

// DELETE /articles/:id
// removes an article from their favorites
