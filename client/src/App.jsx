import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [source, setSource] = useState('')
  const [userInput, setUserInput] = useState('')

  const genrrateQR = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/generateqr', { userInput });
    setSource(res.data.url);
  }

  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="">Enter text for QR generation</label>
          <input type="text" onChange={(e) => setUserInput(e.target.value)} />
          <button onClick={genrrateQR}>Generate</button>
        </div>
      </form>
      <img src={source} alt="" />
    </div>
  )
}

export default App
