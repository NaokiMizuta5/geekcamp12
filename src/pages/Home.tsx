import { AppBar, Toolbar, Typography, Container, Grid, Paper, IconButton, Button, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '@components/Sidebar';
import BlockColumn from '@components/BlockColumn';

function Home() {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', padding: 3}}>
      {/* サイドバー */}
      <Sidebar />
      
      {/* メインコンテンツ */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* ナビゲーションバー */}
        <AppBar position="static" sx={{ marginBottom: 4, width: 800,backgroundColor: "white" }}>
          <Toolbar>
            <IconButton edge="start" aria-label="menu" sx={{ mr: 2, color: "black" }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "black",  textAlign: "left"}}>
              シミズ ナオタロウ's Habits
            </Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />}>
              New Habit
            </Button>
          </Toolbar>
        </AppBar>

        {/* ダッシュボード */}
        <Container sx={{ flexGrow: 1}}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <BlockColumn title="英単語" initialCount={8} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BlockColumn title="筋トレ" initialCount={10} />
            </Grid>
            <Grid item xs={12} md={4}>
              <BlockColumn title="チーム" initialCount={10} coloredBlocks={[{ color: 'green' }, { color: 'blue' }]} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
