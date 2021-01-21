import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import {
    Link,
    useParams
  } from "react-router-dom"


const User = () => {
    const id = useParams().id
    const [users, setUsers] = useState([])
    useEffect(() => {
      const fetchUsers = async () => {
          setUsers(await userService.getAll())
      }
      fetchUsers()  
    }, [])
    const user = users.find(n => n.id === id) 
    console.log("user ist ",user,users,id,Number(id))
    if(user){
    return (
        <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            {user.blogs.map(blog => 
            <li key={blog.id}>
                <Link to={`/blog/${blog.id}`} >{blog.title}</Link>
            </li>)
            } 
        </div>
    )}
    else{
        return(
            <div>
                nix
            </div>
        )
    }
}

export default User