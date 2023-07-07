import React from 'react'
import List from './components/List'
import Navbar from './components/Navbar'

//Styles
import "./styles/App.scss";
import Task from './components/Task';

export default function App() {
  return (
    <>
    <Navbar />
      <List />
      <Task />
    </>
  )
}
