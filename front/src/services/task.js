import axios from 'axios'

const BASE_URL = 'http://localhost:8080'


export const createTask = async (taskname) => {
    try {
      const response = await axios.post(`${BASE_URL}/tasks`, { name: taskname })
      return response.data
    } catch (error) {
      console.error('Error creating list:', error)
      throw error
    }
  }
  
  export const getTask = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`)
      return response.data
    } catch (error) {
      console.error('Error fetching tasks:', error)
      throw error
    }
  }
  