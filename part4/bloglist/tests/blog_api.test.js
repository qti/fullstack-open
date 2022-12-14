const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "String",
        author: "String",
        url: "String",
        likes: 12
    },
    {
        title: "Title",
        author: "Author",
        url: "url",
        likes: 0,

    }
]
describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.length)
    })

    test('a new blog post can be added', async () => {
        const newBlog = {
            title: "New",
            author: "New",
            url: "New",
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogs = await Blog.find({})
        expect(blogs).toHaveLength(initialBlogs.length + 1)
    })

    test('a blog post can be deleted', async () => {
        let blogs = await Blog.find({})

        await api
            .delete(`/api/blogs/${blogs[0].id}`)
            .expect(204)

        blogs = await Blog.find({})
        expect(blogs).toHaveLength(initialBlogs.length - 1)
    })

    test('a blog post can be updated', async () => {
        const updatedBlog = {
            title: "Updated",
            author: "Updated",
            url: "Updated",
            likes: 3
        }

        let blogs = await Blog.find({})
        await api
            .put(`/api/blogs/${blogs[0].id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        blogs = await Blog.find({})
        expect(blogs[0].title).toBe("Updated")
    })
})

afterAll(() => {
    mongoose.connection.close()
})
