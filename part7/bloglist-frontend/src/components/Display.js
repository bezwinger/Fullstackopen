import React from 'react'
import Blog from './Blog'
import { useSelector} from 'react-redux'

  
const Display = () => {
  const blogs = useSelector(state => state.blogs)
    console.log("saaas3", blogs)
    if (!blogs) {
      return null
    }

    return (
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }
  
  export default Display