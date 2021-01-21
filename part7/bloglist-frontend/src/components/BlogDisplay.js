import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { commentBlog } from '../reducers/blogReducer'

    const BlogDisplay = ({ like, destroyBlog }) => {
        const dispatch = useDispatch()
        const [comment, setComment] = useState('')
        const id = useParams().id
        const blogs = useSelector(state => state.blogs)
        const user = useSelector(state => state.user)
        const blog = blogs.find(n => n.id === id) 
        
        const handleCommentChange = (event) =>{
            setComment(event.target.value)
        }
        const newComment = (event) => {
            event.preventDefault()
            const commentObject = {
                content: comment
            }
            console.log("bruh comment",commentObject)
            dispatch(commentBlog(id, commentObject))
        }

        if(!blog){
            return null
        }
        return(
            <div>
            Title:   {blog.title}  <br/>
             Url:    {blog.url}    <br/>
             Likes:  {blog.likes}  <button onClick={() => {like(blog.id)}}>like</button> <br/>
            Author:  {blog.author} <br/>
          
            {
            JSON.parse(window.localStorage.getItem('loggedBlogappUser')).userId === blog.user.id ? 
            <button onClick={() => {destroyBlog(blog)}}>destroy</button> : null }
            <h1>Comments:</h1>
            add comment:
            <div>
            <form onSubmit={newComment}>
            <input
            id='comment'
            value={comment}
            onChange={handleCommentChange}
            />
            <button id='submit' type="submit">save</button>
            </form>
            </div>
            {blog.comments.map(comment => <li key={comment.content}> {comment.content}</li>)}
            </div>
        )
} 

export default BlogDisplay