import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('Article', articleSchema)

// "source": {
// "id": null,
// "name": "Digital Journal"
// },
// "author": "Dr. Tim Sandle",
// "title": "Tech companies and operating margins: Seven lead the way",
// "description": "Revealed - the top seven technology firms, as assessed by operating returns. \nThe post Tech companies and operating margins: Seven lead the way appeared first on Digital Journal.",
// "url": "https://www.digitaljournal.com/business/tech-companies-and-operating-margins-seven-lead-the-way/article",
// "urlToImage": "https://www.digitaljournal.com/wp-content/uploads/2024/10/Grace-Hopper-Superchip.jpg",
// "publishedAt": "2025-07-18T21:29:42Z",
// "content":
