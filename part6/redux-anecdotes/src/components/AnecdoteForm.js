import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { timeNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux' 

const mapDispatchToProps = {
  createAnecdote, timeNotification
}

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.timeNotification(`added ${content}`, 3)
    console.log("saas ",content)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

export default connect(
  null,
  mapDispatchToProps
)
(AnecdoteForm)