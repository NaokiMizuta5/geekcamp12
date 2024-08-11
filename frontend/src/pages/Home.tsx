import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Button,
  Box,
  Paper,
  CircularProgress
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "@components/Sidebar";
import BlockColumn from "@components/BlockColumn";
import ModalHabit from '@components/ModalHabit';
import { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';


interface HabitItem {
  id: number;
  name: string;
  created_by: string;
}

const Home: React.FC<{ userId: number }> = ({ userId }) => {
  const [open, setOpen] = useState(false);
  const [habitItems, setHabitItems] = useState<HabitItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${apiUrl}/api/db/user/joined-habit-items/of/${userId}/`)
      .then(response => {
        console.log(response.data);
        setHabitItems(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the habit items!", error);
        setIsLoading(false);
      });
  }, [userId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = (newHabitItem: HabitItem) => {
    // 新しい habit を habitItems に追加
    setHabitItems(prevHabitItems => [...prevHabitItems, newHabitItem]);
    setOpen(false);
  };


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', padding: 3, backgroundColor: '#f0f4f8' }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          width: '100%',
          maxWidth: 'calc(100vw - 240px)', // 240pxはSidebarの幅
          overflowX: 'hidden',
          margin: '0 auto',
        }}
      >
        <AppBar
          position="static"
          sx={{ marginBottom: 4, width: "100%", backgroundColor: "#ffffff", boxShadow: 'none', borderBottom: '1px solid #ddd' }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              aria-label="menu"
              sx={{ mr: 2, color: "black" }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "#333", textAlign: "left", fontWeight: 'bold' }}
            >
              シミズ ナオタロウ's Habits
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleClickOpen}
              sx={{
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                }
              }}
            >
              New Habit
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ flexGrow: 1 }}>
        {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
          <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: 'row',
                overflowX: 'auto',
                padding: 1,
                paddingBottom: 3,
                '&::-webkit-scrollbar': {
                  height: '8px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#1976d2',
                  borderRadius: '8px',
                },
              }}
            >
              {habitItems.map((habit) => (
                <Paper
                  key={habit.id}
                  elevation={6}
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    minWidth: 300,
                    backgroundColor: '#ffffff',
                    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
                    }
                  }}
                >
                  <BlockColumn title={habit.name} habitId={habit.id} userId={userId} />
                </Paper>
              ))}
            </Box>
        )}
      </Container>
      </Box>

      {/* ModalHabitを呼び出し、habit作成後にhandleSaveが呼ばれる */}
      <ModalHabit open={open} onClose={handleClose} onSave={handleSave} userId={userId} />
    </Box>
  );
}

export default Home;

