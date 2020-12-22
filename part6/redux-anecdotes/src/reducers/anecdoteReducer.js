import anecdoteService from '../services/anecdotes'
import voteService from '../services/votes'


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': 
      return state.map(stat => stat.id === action.data.id ? {...stat , votes: stat.votes+1 } : stat)
    case 'NEUE_ANECDOTE':
      console.log("action data", action.data)
      return state.concat(action.data)
    case 'INIT_ANECDOTE':
      return action.data
    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_ANECDOTE',
    data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
    type: 'NEUE_ANECDOTE',
    data: newAnecdote,
    })
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    await voteService.voteAnecdote(id)
    dispatch({
    type: 'VOTE',
    data: { id }
    })
  }
}


export default reducer