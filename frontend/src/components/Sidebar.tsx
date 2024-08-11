import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Divider, Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';  // or AppsIcon
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo1.png'; // ロゴ画像のパスを適宜修正してください

const drawerWidth = 280; // 幅を広くする

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // 現在のパスを取得

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#D9D9D9', },
      }}
    >
            {/* アプリ名とロゴの表示 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 100, // 標準的なToolbarの高さ
          backgroundColor: '#D9D9D9',
          paddingLeft: 3, // 左側のパディングを追加
        }}
        >
          <img src={logo} alt="Hablock Logo" style={{ width: 50, height: 50, marginRight: 8 }} />
          <Typography variant="h6" component="div">
            Hablock
          </Typography>
      </Box>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ marginBottom: 1 }}>
          <ListItemButton 
            onClick={() => navigate('/Home')}
            sx={{ 
              backgroundColor: location.pathname === '/Home' ? '#1976d2' : 'inherit', // 選択されたときに青にする
              color: location.pathname === '/Home' ? '#FFFFFF' : 'inherit', // 選択されたときに文字を白にする
              padding: '18px 40px' // ボタンのパディングを増やして広げる
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === '/Home' ? '#FFFFFF' : 'inherit' }}>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Habits" 
              sx={{ 
                color: location.pathname === '/Home' ? '#FFFFFF' : 'inherit', // 選択されたときに文字を白にする
                fontSize: '1.2rem' // 文字サイズを大きくする
              }} 
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ marginBottom: 1 }}>
          <ListItemButton 
            onClick={() => navigate('/friends')}
            sx={{ 
              backgroundColor: location.pathname === '/friends' ? '#1976d2' : 'inherit', // 選択されたときに青にする
              color: location.pathname === '/friends' ? '#FFFFFF' : 'inherit', // 選択されたときに文字を白にする
              padding: '18px 40px' // ボタンのパディングを増やして広げる
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === '/friends' ? '#FFFFFF' : 'inherit' }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Friends" 
              sx={{ 
                color: location.pathname === '/friends' ? '#FFFFFF' : 'inherit', // 選択されたときに文字を白にする
                fontSize: '1.2rem' // 文字サイズを大きくする
              }} 
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ marginBottom: 1 }}>
          <ListItemButton 
            onClick={() => navigate('/settings')}
            sx={{ 
              backgroundColor: location.pathname === '/settings' ? '#1976d2' : 'inherit', // 選択されたときに青にする
              color: location.pathname === '/settings' ? '#FFFFFF' : 'inherit', // 選択されたときに文字を白にする
              padding: '18px 40px' // ボタンのパディングを増やして広げる
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === '/settings' ? '#FFFFFF' : 'inherit' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Apps settings" 
              sx={{ 
                color: location.pathname === '/settings' ? '#FFFFFF' : 'inherit', // 選択されたときに文字を白にする
                fontSize: '1.2rem' // 文字サイズを大きくする
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;