import axios from 'axios'
import { useSelector } from 'react-redux'
const baseUrl = '/api/blogs'

let token = null //useSelector(state => state.user.token)
let userId = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const setUserId = newUserId => {
  userId = newUserId
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const like = async(id) => {
  const response = await axios.patch(`${baseUrl}/${id}`)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

const destroy = async(id) => {
  console.log("destroy2",id)
  const config = {
    headers: { Authorization: token },
  }
  const blogToDelete = await axios.delete(`${baseUrl}/${id}`,config)

  return blogToDelete.data  
}

const addComment = async(id , newObject) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, newObject)
}

export default { getAll, create, update, setToken, like, destroy, addComment }