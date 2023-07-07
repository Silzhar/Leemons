import React, { useState, useEffect } from 'react'
import { createTask, getTask } from '../services/task'

export default function Task() {
    const [tasks, setTasks] = useState([])
    const [newTaskName, setNewTaskName] = useState([])

    useEffect(() => {
    
        fetchTasks()
      }, [])

      async function fetchTasks() {
        try {
          const response = await getTask()
          setTasks(response)
    
        } catch (error) {
          console.error('Error fetching tasks:', error)
        }
      }

      async function handleCreateTask() {
        try {
          await createTask(newTaskName)
          setNewTaskName('')
          fetchTasks()
        } catch (error) {
          console.error('Error creating task:', error)
        }
      }

    
  return (
    <div className='homeList'>
      <h1>tareas</h1>
      <div className='createList'>
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <button onClick={handleCreateTask} variant="contained">Create Task</button>
      </div>

      {tasks && tasks.length > 0 && (
        <div className='listContainer'>
          {tasks.map((task) => (
            <div key={task.id} >{task.name}</div>
          ))}
        </div>
      )}

    </div>
  )
}
