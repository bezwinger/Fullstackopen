import React from 'react'
import personService from '../services/Persons.js'


const Display  = ({id, name, number, deleteFunction}) =>{
    
    const handleClick = (id) =>{
        if(window.confirm("destroy "+name+"?")){
            console.log(id)
            deleteFunction(id)
        }
    }
    return(
        <div>
            <li>{name} {number} <button onClick={() => handleClick(id)} >delete</button></li>
            
        </div>
    )
}

export default Display;