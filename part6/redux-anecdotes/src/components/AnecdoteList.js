import React from 'react'
import { connect } from 'react-redux' 
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { timeNotification } from '../reducers/notificationReducer'

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().search(state.filter.toLowerCase()) !== -1),
    filter: state.filter //values in connect als props setzen 
  }
}

const mapDispatchToProps = {
  voteAnecdote, timeNotification
}

const AnecdoteList = (props) => {
    console.log("prop",props)
    const vote = (id, content) => {
        props.voteAnecdote(id)
        props.timeNotification(`voted ${content}`, 3)
      }
    return(
        <div>
        {props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)