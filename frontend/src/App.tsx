import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Settings from './pages/Settings';
import Sidebar from "@components/Sidebar";
import { Box } from '@mui/material';
import './App.css';

const drawerWidth = 240; // サイドバーの幅を指定

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

function MainContent() {
  const location = useLocation();
  // 一旦ハードコード
  const userId = 1; 

  // サイドバーを表示するルート
  const showSidebar = location.pathname === '/' || location.pathname === '/friends' || location.pathname === '/settings';

  return (
    <Box sx={{ display: 'flex' }}>
      {/* サイドバーを条件付きで表示 */}
      {showSidebar && <Sidebar />}

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: showSidebar ? `calc(100% - ${drawerWidth}px)` : '100%', // サイドバーの幅を引いたサイズに調整
          ml: showSidebar ? `${drawerWidth}px` : 0, // サイドバーの幅だけ左にマージンを設定
        }}
      >
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home userId={userId}/>} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/settings" element={<Settings />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
