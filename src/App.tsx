import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Settings from './pages/Settings';
import Sidebar from "@components/Sidebar";
import { Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();

  // サイドバーを表示するルート
  const showSidebar = location.pathname === '/' || location.pathname === '/friends' || location.pathname === '/settings';
  return (
    <Box sx={{ display: 'flex' }}>
      {/* サイドバーを条件付きで表示 */}
      {showSidebar && <Sidebar />}

      {/* メインコンテンツ */}
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
