const blogsRouter = require('express').Router()
const { request } = require('express')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async(req, res) => {
  const blogs = await Blog.find({}).populate('user')
  res.json(blogs)
})

blogsRouter.get('/:id', async(req, res) => {
  const blogs = await Blog.findById(req.params.id).populate('user')
  res.json(blogs) 
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  console.log("token der scheiß nigger2",req.token)
  if (!req.token){ return res.status(400).json({ error: 'token missing'})}
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  console.log("token der scheiß nigger",decodedToken)
  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log("user ",user)
  const blog = new Blog({
    title:  body.title,
    author: body.author || undefined,
    url:    body.url,
    likes:  body.likes,
    user:   user._id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const popBlog = await Blog.findById(savedBlog._id).populate('user') 
  res.json(popBlog)
})
blogsRouter.post('/:id/comments', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  const body = req.body
  await Blog.findByIdAndUpdate(req.params.id, {comments: blog.comments.concat(body)}, {new: true} )
  console.log("vconsole",blog,body)
})

blogsRouter.patch('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  await Blog.findByIdAndUpdate(req.params.id, {likes: blog.likes+1}, {new: true} )
  res.status(200).end()
})

blogsRouter.delete('/:id', async (req, res) => {
  if (!req.token){ return res.status(400).json({ error: 'token missing'})}

  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken.id) {return res.status(401).json({ error: 'token invalid' })}

  const blog = await Blog.findById(req.params.id)
  if(!blog){
    return res.status(204).json({ error: 'wrong token'})
  }

  if(!(blog.user.toString() === decodedToken.id.toString())){
    return res.status(401).json({ error: 'wrong token'})
  }
  await Blog.findByIdAndDelete(req.params.id)
  
  res.status(200).end()
  
})

module.exports = blogsRouter