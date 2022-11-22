const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes, 0)
}

const favoriteBlog = (blogs) => {
    const likesByBlog = blogs.map(blog => blog.likes)
    const index = likesByBlog.indexOf(Math.max(...likesByBlog))
    return blogs[index]
}

const mostBlogs = (blogs) => {
    const _obj = {}
    blogs.forEach(blog => blog.author in _obj ? _obj[blog.author] += 1 : _obj[blog.author] = 1)
    return Object.keys(_obj).reduce((a, b) => _obj[a] > _obj[b] ? a : b)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}
