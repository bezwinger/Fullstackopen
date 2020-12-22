import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])

  const vote = () => {
     const array = [ ...votes ]
     array[selected]+=1
     setVotes(array)
     console.log(array)
  }
  return (
    <div>
      {console.log(selected)}
      <div>
      <div>
        <h1>anecdote of the day</h1>
        <div>{props.anecdotes[selected]}</div> 
        <div>has {votes[selected]} votes</div>
      </div>
      <button onClick={() => {setSelected(Math.floor(Math.random() * Math.floor(6)))}}>next anecdote</button>
      <button onClick={() => {vote()}}>vote</button>
      </div>

      <div>
      <h1>anecdote ith most votes</h1>
      <div>{props.anecdotes[votes.indexOf(Math.max( ...votes))]}</div>
      <div>{votes[votes.indexOf(Math.max( ...votes))]} votes</div>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const votes = [0,0,0,0,0,0]

ReactDOM.render(
  <App anecdotes={anecdotes} votes={votes} />,
  document.getElementById('root')
)