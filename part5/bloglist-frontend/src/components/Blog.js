import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'

const Blog = ({ blog, like, destroyBlog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className= 'blog' style={blogStyle}>
      <div style={hideWhenVisible} className='hiden'>
      
          {blog.title} {blog.author}
        
          <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible} className= 'shown'>
        
          Title:  {blog.title}  <br/>
          Url:    {blog.url}    <br/>
          Likes:  {blog.likes}  <button onClick={() => {like(blog.id)}}>like</button> <br/>
          Author: {blog.author} <br/>
          
          <button onClick={toggleVisibility}>hide</button>
          {console.log("snitch nigger",JSON.parse(window.localStorage.getItem('loggedBlogappUser')).userId)}
          {
            
            JSON.parse(window.localStorage.getItem('loggedBlogappUser')).userId === blog.user.id ? 
            <button onClick={() => {destroyBlog(blog)}}>destroy</button>
            :
            null
          }
          
      </div>
    
  

  
    
    </div>)
}

export default Blog
