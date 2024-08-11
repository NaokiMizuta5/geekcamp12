import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Typography, Divider, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';  // or AppsIcon
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo1.png'; // ロゴ画像のパスを適宜修正してください

const drawerWidth = 240;

function Sidebar() {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#D9D9D9' },
      }}
    >
      {/* アプリ名とロゴの表示 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 64, // 標準的なToolbarの高さ
          backgroundColor: '#D9D9D9',
          paddingLeft: 2, // 左側のパディングを追加
        }}
      >
        <img src={logo} alt="Hablock Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
        <Typography variant="h6" component="div">
          Hablock
        </Typography>
      </Box>

      <Divider />

      <List>
        <ListItem disablePadding sx={{ marginBottom: 2 }}>
          <ListItemButton onClick={() => navigate('/home')}>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Habits" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ marginBottom: 2 }}>
          <ListItemButton onClick={() => navigate('/friends')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="App Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
