import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import logo from '../assets/logo1.png';
import { Box, Button, TextField, Typography, Container, Link } from '@mui/material';


const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });
    
            if (response.status === 200) {
                navigate('/home');
            } else {
                alert('ログインに失敗しました。もう一度お試しください。');
            }
        } catch (error) {
            console.error('ログインエラー:', error);
            alert('ログインに失敗しました。もう一度お試しください。');
        }
    };

    return (
        <>
            <Box
                component="header"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px 10px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '60px',
                }}
            >
                <Box display="flex" alignItems="center">
                    <img src={logo} alt="Logo" style={{ height: '40px' }} />
                    <Typography variant="h6" sx={{ marginLeft: '10px', color: '#000000' }}>
                        Hablock
                    </Typography>
                </Box>
                <Typography
                    variant="subtitle1"
                    sx={{
                        color: '#000000',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flexGrow: 1,
                        textAlign: 'right', // テキストを右揃えにする
                        paddingRight: '20px', // 右側にスペースを確保
                    }}
                >
                    Welcome back!
                </Typography>
            </Box>

            <Container
                component="main"
                maxWidth={false}
                sx={{
                    width: '400px',
                    marginTop: '100px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography component="h1" variant="h5" sx={{ textAlign: 'left', width: '100%', color: '#000000'}} gutterBottom >
                    Log In
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{ style: { backgroundColor: '#f0f0f0' } }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{ style: { backgroundColor: '#f0f0f0' } }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Login
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 , color: '#000000'}}>
                    New to Hablock?{' '}
                    <Link href="#" onClick={() => navigate('/register')} underline="hover">
                        Sign up
                    </Link>
                </Typography>
            </Container>
        </>
    );
};

export default Login;
