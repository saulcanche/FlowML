import { useState } from 'react'
import './App.css'
import FileDropZone from './components/FileDropZone/FileDropZone.jsx'




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1> Test dropzone</h1>
      <FileDropZone/>
    </>
  )
}

export default App
