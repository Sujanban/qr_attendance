import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [source, setSource] = useState('')

  const fetchQR = async () => {
    const res = await axios.get('http://localhost:5000/api/generateqr');
    setSource(res.data.url);
  }

  useEffect(() => {
    fetchQR()
  }, [])

  return (
    <div>
      <img src={source} alt="" />
    </div>
  )
}

export default App
