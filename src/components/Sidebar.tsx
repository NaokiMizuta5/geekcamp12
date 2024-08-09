import { Drawer, List, ListItem, ListItemText, ListItemButton, ListItemIcon, Toolbar, Divider } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import ViewListIcon from '@mui/icons-material/ViewList';  // or AppsIcon


const drawerWidth = 240;

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#D9D9D9', },
      }}
    >
      <Toolbar />
      <Divider />
      <List>
      <ListItem disablePadding sx={{ marginBottom: 2 }}>
          <ListItemButton>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="Habits" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ marginBottom: 2 }}>
          <ListItemButton>
          <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
          <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Apps settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
