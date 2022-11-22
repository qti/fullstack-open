const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog');


app.use(cors())
app.use(express.json())

module.exports = app
