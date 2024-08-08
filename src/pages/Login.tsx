import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../assets/logo1.png';


const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        if (response.ok) {
            navigate('/home');
        } else {
            alert('ログインに失敗しました。もう一度お試しください。');
        }
    };

    return (
        <>
            <header className="header">
            <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo-small" />
                    <span className="app-name">Hablock</span>
                </div>
                <div className="welcome-text">Welcome back!</div>
            </header>
            <div className="container">
                <h2>Login to Hablock</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Username:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
                <button className="register-button" onClick={() => navigate('/register')}>Sign up</button>
            </div>
        </>
    );
};

export default Login;
