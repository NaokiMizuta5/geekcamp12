import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <div className="container">
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">ユーザーネーム:</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <label htmlFor="password">パスワード:</label>
                <input 
                    type="password" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">ログイン</button>
            </form>
            <button onClick={() => navigate('/register')}>ユーザー登録</button>
        </div>
    );
};

export default Login;
