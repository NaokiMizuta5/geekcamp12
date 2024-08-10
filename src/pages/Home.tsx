import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  IconButton,
  Button,
  Box,
  Paper
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

  const handleSave = async (habitData: { name: string }) => {
    try {
      const response = await axios.post(`${apiUrl}/api/habits/create/`, {
        name: habitData.name,
        created_by: userId, // `userId` は数値
      });

      console.log('Response data:', response.data); // デバッグ用にレスポンスデータを確認

      const newHabitItem: HabitItem = {
        id: response.data.habit_item_id,
        name: response.data.name,
        created_by: userId.toString(), // userId を文字列に変換
      };
       console.log('New Habit ID:', newHabitItem.id); // ここで新しい habit_item_id を確認
      setHabitItems(prevHabitItems => [...prevHabitItems, newHabitItem]);
      setOpen(false);
    } catch (error) {
      console.error('Error creating a new habit item:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', padding: 3, backgroundColor: '#f0f4f8' }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          width: "100vw",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
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
              sx={{ flexGrow: 1, color: "black", textAlign: "left" }}
            >
              シミズ ナオタロウ's Habits
            </Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpen}>
              New Habit
            </Button>
          </Toolbar>
        </AppBar>

        <Container sx={{ flexGrow: 1 }}>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <Grid container spacing={4}>
            {habitItems.map((habit) => (
              <Grid item xs={12} md={4} key={habit.id}>
                <Paper elevation={6} sx={{ padding: 2, borderRadius: 2 }}>
                  <BlockColumn title={habit.name} habitId={habit.id} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      </Box>

      <ModalHabit open={open} onClose={handleClose} onSave={handleSave} />
    </Box>
  );
}

export default Home;

