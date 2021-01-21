import React, { useState } from 'react' 

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const style = {
    "backgroundSize":"100% 100%",
    "WebkitBoxDecorationBreak":"clone",
    "boxDecorationBreak":"clone","paddingLeft":"5px",
    "paddingRight":"5px",
    "background":"linear-gradient(transparent,transparent 42%,#ff0 0,#ff0 85%,transparent 0) no-repeat",
    "box-sizing": "border-box"
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title:    title,
      author:   author,
      url:      url
    })
    
  }

  return (
    <div>
      <h2 style={style}>Create a new Blog</h2>
      <form id='form' onSubmit={addBlog}>
      <div>Title:
      <input
        id='title'
        value={title}
        onChange={handleTitleChange}
        />
      </div>
      <div>Author:
      <input
        id='author'
        value={author}
        onChange={handleAuthorChange}
        />
      </div>
      <div>Url:
      <input
        id='url'
        value={url}
        onChange={handleUrlChange}
        />
      </div>
        <button id='submit' type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm