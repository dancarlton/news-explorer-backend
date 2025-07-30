const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  keyword: { type: String, required: true },
  source: {
    id: { type: String },
    name: { type: String, required: true },
  },
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  urlToImage: { type: String },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

module.exports = mongoose.model('Article', articleSchema)
