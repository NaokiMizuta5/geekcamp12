import React, { useState } from 'react';
import axios from 'axios';
import { Container } from '@mui/material';

const Register: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/', {
                username,
                email,
                password
            });
            console.log('Response:', response);
            if (response.status === 201) {
                alert('登録に成功しました！');
            } else {
                alert('登録に失敗しました。もう一度お試しください。');
            }
        } catch (error) {
            // エラーをAxiosErrorとしてキャストする
            if (axios.isAxiosError(error)) {
                console.error('登録エラー:', error);
                if (error.response) {
                    console.error('サーバーエラーデータ:', error.response.data);
                    console.error('サーバーエラーステータス:', error.response.status);
                    console.error('サーバーヘッダー:', error.response.headers);
                } else if (error.request) {
                    console.error('リクエストデータ:', error.request);
                } else {
                    console.error('エラーメッセージ:', error.message);
                }
            } else {
                // Axiosエラーではない場合の処理
                console.error('不明なエラー:', error);
            }
            alert('登録に失敗しました。もう一度お試しください。');
        }
    }

    return (
        <Container className="container">
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
        </Container>
    );
};

export default Register;
