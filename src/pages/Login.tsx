import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="container">
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">メールアドレス:</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
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
