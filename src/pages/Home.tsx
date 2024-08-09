import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  IconButton,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddIcon from "@mui/icons-material/Add";
import Sidebar from "@components/Sidebar";
import BlockColumn from "@components/BlockColumn";
import { useState } from "react";

function Home() {
  const [open, setOpen] = useState(false);
  const [habitName, setHabitName] = useState("");

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
    <Box sx={{ display: "flex", minHeight: "100vh", padding: 3 }}>
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
          sx={{ marginBottom: 4, width: "100%", backgroundColor: "white" }}
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
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <BlockColumn title="英単語" initialCount={8} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BlockColumn title="筋トレ" initialCount={10} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BlockColumn
                title="チーム"
                initialCount={10}
                coloredBlocks={[{ color: "green" }, { color: "blue" }]}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* モーダルウィンドウ */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Start New Habit!</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Habit Name"
            type="text"
            fullWidth
            variant="outlined"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Home;
