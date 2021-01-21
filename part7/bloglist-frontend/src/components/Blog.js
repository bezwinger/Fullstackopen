import userEvent from '@testing-library/user-event'
import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Blog = ({ blog, like, destroyBlog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  return (
    <div className= 'blog' style={blogStyle}>
      <div >
      
      <Link to={`/blog/${blog.id}`} >{blog.title} {blog.author}</Link>
      
           
        
          
      </div>
      {/*<div style={showWhenVisible} className= 'shown'>
        
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
          
        </div>*/}
    
  

  
    
    </div>)
}

export default Blog
