import React, { useState, useEffect } from 'react'
import { createList, getLists } from '../services/list'


export default function List() {
  const [lists, setLists] = useState([])
  const [newListName, setNewListName] = useState('')
  
  useEffect(() => {
    
    fetchLists()
  }, [])
  
  
  async function fetchLists() {
    try {
      const response = await getLists()
      setLists(response)

    } catch (error) {
      console.error('Error fetching lists:', error)
    }
  }

  async function handleCreateList() {
    try {
      await createList(newListName)
      setNewListName('')
      fetchLists()
    } catch (error) {
      console.error('Error creating list:', error)
    }
  }


  return (
    <div className='homeList'>
      <h1>Listas</h1>
      <div className='createList'>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
        />
        <button onClick={handleCreateList} variant="contained">Create List</button>
      </div>

      {lists && lists.length > 0 && (
        <div className='listContainer'>
          {lists.map((list) => (
            <div key={list.id} >{list.name}</div>
          ))}
        </div>
      )}

    </div>
  );
}
