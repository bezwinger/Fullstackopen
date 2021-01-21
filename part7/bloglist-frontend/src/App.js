import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogDisplay from './components/BlogDisplay'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login' 
import userService from './services/users'
import Notification from './components/Notification'
import Display from './components/Display'
import UsersDisplay from './components/UserDisplay'
import Menubar from './components/Menubar'
import User from './components/User'
import { timeNotification } from './reducers/notificationReducer'
import { newBlog , voteBlog , destroyBlog} from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory
} from "react-router-dom";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const blogFormRef = useRef()
  
  useEffect(() => {
    dispatch(timeNotification(errorMessage, 5))
  }, [errorMessage])

  useEffect(() => {
    blogService.getAll().then(blogs =>{
    dispatch({
      type: 'SET_BLOGS',
      data: { blogs: blogs }
    }
    )})
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      if(loggedUser){dispatch(setUser(loggedUser))}
      if(loggedUser.token){
      blogService.setToken(loggedUser.token)
    }
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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
    }
    console.log('logging in with', username, password)
  }

  const createBlog = async (blogObjekt) => {
    console.log(blogObjekt)
    dispatch(newBlog(blogObjekt))
    blogFormRef.current.toggleVisibility()
    setErrorMessage('added a new blog')
  }

  const likeBlog =(id) => {
    dispatch(voteBlog(id))
    setErrorMessage(`liked blog`)
  }

  const deleteBlog = (blog) => {
    console.log("destroy",blog)
    if(window.confirm(`Destroy blog ${blog.title} by ${blog.author}???`)){
      console.log(blog.id, user.id, user)
      dispatch(destroyBlog(blog.id))
      setErrorMessage(`destroyed ${blog.title}`)
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
  )

  const blogForm = () => (
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      <Display likeBlog={likeBlog} deleteBlog={deleteBlog}/>
    </div>  
  )

  return (
    <div>
      <h1>blogs</h1>
      {console.log(errorMessage, "usertest", user)}
      <Notification/>
      <div>
        
      {user === null ?
        loginForm() :
        <div>
      <Menubar user={user}/>
      <Switch>
        <Route path='/blog/:id'>
          <BlogDisplay like={likeBlog} deleteBlog={deleteBlog}/>
        </Route>
        <Route path="/user/:id">
          <User/>
        </Route>
        <Route path='/user'>
         < UsersDisplay />
        </Route>
        <Route path='/'>
          {blogForm()}
        </Route>
      </Switch>
        </div>
      } 
      </div>
    </div>
  )
}

export default App