import React from 'react'
import { useEffect, useState } from 'react'
import userService from '../services/users'
import { Link } from "react-router-dom";

const UsersDisplay = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
      const fetchUsers = async () => {
          setUsers(await userService.getAll())
      }
      fetchUsers()  
    }, [])
    return (
        <div>
            <table>
             <tbody><tr>
                <th>Users</th>
                <th>Blogposts</th>
             </tr>
             {users.map(user=> 
             <tr key={user.id}>
                <td>
                 <Link to={`/user/${user.id}`}>
                     {user.name}
                 </Link>
                 </td>
                 <td>{user.blogs.length}</td>
             </tr> )}
             </tbody>
            </table>
        </div>
    )
}    

export default UsersDisplay