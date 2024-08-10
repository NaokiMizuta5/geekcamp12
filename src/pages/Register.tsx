import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo1.png';
import { Box, Button, TextField, Typography, Container, Link, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                email,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.status === 201) {
                alert('登録に成功しました！');
                navigate('/home');
            } else {
                alert('登録に失敗しました。もう一度お試しください。');
            }
        } catch (error) {
            alert('エラーが発生しました。後ほど再試行してください。');
            console.error(error); // デバッグ用
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
                    padding: '10px 20px',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '60px',
                    boxSizing: 'border-box',
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
                        textAlign: 'right',
                        paddingRight: '20px',
                    }}
                >
                    Create your account!
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
                    Sign up
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Username"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        InputProps={{ style: { backgroundColor: '#f0f0f0' } }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                name="agreeTerms"
                                color="primary"
                            />
                        }
                        label={<Typography sx={{ fontSize: '0.875rem', paddingTop: '12px' }}>I agree to the terms and coditions</Typography>}
                        sx={{ alignItems: 'flex-start' }}
                        labelPlacement="end"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Get Started
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ mt: 2 , color: '#000000'}}>
                    Already a member?{' '}
                    <Link href="#" onClick={() => navigate('/login')} underline="hover">
                        Log in
                    </Link>
                </Typography>
            </Container>
        </>
    );
};

export default Register;
