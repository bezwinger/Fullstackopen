import React from 'react'

const Total = ({parts}) =>{   
    return(
        <div>
            <p>{parts.reduce((sum , part) => sum + part.exercises ,0)}</p>
        </div>
    )
}

export default Total;