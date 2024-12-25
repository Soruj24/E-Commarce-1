require('dotenv').config()

const port = process.env.PORT || 3000
const mongodb_url = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/e-commerce"

module.exports = { port, mongodb_url }