import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
    return (await axios.get(baseUrl)).data
   /* const request = axios.get(baseUrl)
    return request.then(response => response.data)*/
  }

export default { getAll }