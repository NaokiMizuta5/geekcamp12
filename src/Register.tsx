import React, { useState } from 'react';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        if (response.ok) {
            alert('登録に成功しました！');
        } else {
            alert('登録に失敗しました。もう一度お試しください。');
        }
    };

    return (
        <div className="container">
            <h2>ユーザー登録</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">ユーザー名:</label>
                <input 
                    type="text" 
                    id="username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
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
                <button type="submit">登録</button>
            </form>
        </div>
    );
};

export default Register;
