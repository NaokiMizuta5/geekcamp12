import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Register from '@pages/Register';
import Navbar from '@components/Navbar';

function App() {

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
