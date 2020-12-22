import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const voteAnecdote = async (id) => {
    const anecdote = await axios.get(`${baseUrl}/${id}`)
    axios.patch(`${baseUrl}/${id}`,{ votes: anecdote.data.votes+1 })
}

export default { voteAnecdote }