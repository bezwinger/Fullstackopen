import React from 'react'
import { setUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
const Menubar = ({user}) => {
  const dispatch = useDispatch()
const style = {
    background: 'lightgrey',
    position: 'relative',
    fontFamily: 'Roboto Mono',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 5.55556,
    paddingRight: 5.55556,
    margin: 0 
}
  const logout = () => {
    window.localStorage.clear()
    dispatch(setUser(null))
  }

    return (
          <div style={style}>
            <Link to='/' >Blogs</Link>
            <Link to='/user'>Users</Link>
            {user.name} is logged in 
            <button id='logout' onClick={() => {logout()}}>logout</button>
          </div>
    )
}

export default Menubar 