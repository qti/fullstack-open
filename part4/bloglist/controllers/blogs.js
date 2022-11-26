const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
        .then(blogs => {
            response.json(blogs)
        })
})

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

blogRouter.post('/', async (request, response) => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = await new Blog({ ...request.body, user: user._id })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote)
})

module.exports = blogRouter
