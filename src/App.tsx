import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Register from '@pages/Register';
import Navbar from '@components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </>
    </Router>
  )
}

export default App
