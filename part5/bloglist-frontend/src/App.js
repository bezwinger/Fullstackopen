import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])
  

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
  }
  const createBlog = async (blogObjekt) => {
    const newBlog = await blogService.create(blogObjekt)
    setBlogs(blogs.concat(newBlog))
    blogFormRef.current.toggleVisibility()
  }

  const likeBlog =(id) => {
    console.log(id)
    blogService.like(id)
    setBlogs(blogs.map(blog => blog.id === id ? {...blog,likes: blog.likes+1} : blog))
  }

  const deleteBlog = (blog) => {
    //das funktioniert bei einigen blogs nicht da der token über geben wird.
    //blogs ohne benutzer haben keinen token und so keinen dersie löschen kann

    console.log("destroy",blog)
    if(window.confirm(`Destroy blog ${blog.title} by ${blog.author}???`)){
      console.log(blog.id, user.id, user)
      blogService.destroy(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
    
  }

  const loginForm = () => (
    <Togglable buttonLabel='login' >
      <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
      />
    </Togglable>
    /*
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>    */  
  )
  const blogForm = () => (
    <div>
      <div>
        {user.name} is logged in
        <button id='logout' onClick={() => {logout()}}>logout</button>
      </div>
      
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>

      {console.log(blogs)}
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} like={likeBlog} destroyBlog={deleteBlog}/>)}
    </div>  
  )

  return (
    <div>
      <h1>blogs</h1>
      {user === null ?
        loginForm() :
        blogForm()
      } 
    </div>
  )
}

export default App