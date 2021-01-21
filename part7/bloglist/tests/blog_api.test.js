const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')


beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)    
  })

  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
      await user.save()
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
          username: 'root',
          name: 'Superuser',
          password: 'salainen',
        }
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('`username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1) 
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })

test('blogs are returned as json', async () => {
    const res = await api.get('/api/blogs')
    expect(res.type).toBe('application/json')
    expect(res.status).toBe(200)
})

test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body).toHaveLength(helper.initialBlogs.length)
})

describe('shit that needs an user in order to work', () => {
  let superusertoken
  beforeAll(async () => {

    const newSuperUser = {
      username: 'supertestuser',
      name: 'supertestuser',
      password:'supertestuser'
  }
    await api.post('/api/users').send(newSuperUser)
    const res = await api.post('/api/login').send(newSuperUser)
    const response = res.body
    superusertoken = (`bearer ${response.token}`)
    
  })

  test('blog added successfully', async () => {
    const newBlog = {
        title:  'Do clowns have huge dicks????',
        author: 'buzzfeed Unsolved',
        url:    'fuckhappens.com',
        likes:   21
    }
    const res = await api.post('/api/blogs').send(newBlog).set('Authorization', superusertoken)
    expect(res.status).toBe(200)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('blog post with undefined likes gets 0 default', async () => {
    const newBlog = {
        title:  'bruh',
        author: 'buzzfeed',
        url:    'shithappens.com'
    }
    const res = await api.post('/api/blogs').send(newBlog).set('Authorization', superusertoken)
    expect(res.body.likes).toBe(0)
    expect(res.status).toBe(200)
  })

  test('blog post with undefined title and url gets 400 error', async () => {
    const newBlog = {
        author: 'buzzfeed'
    }
    const res = await api.post('/api/blogs').send(newBlog).set('Authorization', superusertoken)
    expect(res.status).toBe(400)
  })

  test('invalid users cant be added', async () => {
    const newUser = {
        username: 'gg',
        name: 'jonas tester',
        password:'F'
    }
    const res = await api.post('/api/users').send(newUser).set('Authorization', superusertoken)
    expect(res.status).toBe(400)
})
})

afterAll(() => {
  mongoose.connection.close()
})