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
import { useState, useEffect} from "react";
import axios from "axios";

interface HabitItem {
  id: number;
  name: string;
  created_by: number | null;
}

const Home: React.FC<{ userId: number }> = ({ userId }) => {
  
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [habitItems, setHabitItems] = useState<HabitItem[]>([]);


  useEffect(() => {
    // created_byに基づいてHabitItemを取得
    axios.get(`/api/get_habits_by_user/`)
      .then(response => {
        setHabitItems(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the habit items!", error);
      });
  }, [userId]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // ここで新しい習慣の保存処理を実行します
    console.log("New Habit:", habitName);
    setHabitName("");
    handleClose();
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', padding: 3, backgroundColor: '#f0f4f8' }}>
      {/* サイドバー */}
      <Sidebar />

      {/* メインコンテンツ */}
      <Box
        component="main"
        sx={{
          width: "100vw",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ナビゲーションバー */}
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

        {/* ダッシュボード */}
        <Container sx={{ flexGrow: 1 }}>
          {habitItems.map((habit) => (
          <Grid item xs={12} md={4} key={habit.id}>
            <Paper elevation={6} sx={{ padding: 2, borderRadius: 2 }}>
              <BlockColumn title={habit.name} habitId={habit.id} />
            </Paper>
          </Grid>
          ))}
        </Container>
      </Box>

      {/* モーダルウィンドウ */}
      <ModalHabit open={open} onClose={handleClose} onSave={handleSave} />
    </Box>
  );
}

export default Home;
