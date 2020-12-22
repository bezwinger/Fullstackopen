import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.buttonLabel}
  </button>
  )
}
const Statistics = (props) => {
  if((props.good+props.neutral+props.bad)===0){
    return(
      <div>
        <h1>statistics</h1>
        no feedback given
      </div>
    )
  }
  return(
    <div>
    <h1>statistics</h1>
      <table>   
        <Statistic name="good" value={props.good}/>
        <Statistic name="neutral" value={props.neutral}/>
        <Statistic name="bad" value={props.bad}/>
        <Statistic name="all" value={props.good+props.neutral+props.bad}/>
        <Statistic name="average" value={(props.good*1+props.bad*-1)/(props.good+props.bad)}/>
        <Statistic name="positive" value={props.good /(props.good + props.neutral+props.bad)}/>
      </table>
    </div>
  )

}
const Statistic = (props) => {
  return(
      <tr>
       <td>{props.name}</td> 
       <td>{props.value}</td> 
      </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>{setGood(good+1)}} buttonLabel="good"/>
      <Button handleClick={()=>{setNeutral(neutral+1)}} buttonLabel="neutral"/>
      <Button handleClick={()=>{setBad(bad+1)}} buttonLabel="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)