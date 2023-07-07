import axios from 'axios'

const BASE_URL = 'http://localhost:8080'

export const createList = async (listName) => {
  try {
    const response = await axios.post(`${BASE_URL}/lists`, { name: listName })
    return response.data
  } catch (error) {
    console.error('Error creating list:', error)
    throw error
  }
}

export const getLists = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/lists`)
    return response.data
  } catch (error) {
    console.error('Error fetching lists:', error)
    throw error
  }
}
