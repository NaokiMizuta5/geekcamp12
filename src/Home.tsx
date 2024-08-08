import React, { useState, useEffect } from 'react';

const Home: React.FC = () => {
    const [habits, setHabits] = useState<string[]>([]);
    const [habit, setHabit] = useState<string>('');

    useEffect(() => {
        const fetchHabits = async () => {
            const response = await fetch('/api/habits');
            const data = await response.json();
            setHabits(data);
        };
        fetchHabits();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const response = await fetch('/api/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ habit })
        });
        if (response.ok) {
            setHabit('');
            const newHabit = await response.json();
            setHabits([...habits, newHabit]);
        } else {
            alert('習慣の追加に失敗しました。もう一度お試しください。');
        }
    };

    return (
        <div className="container">
            <h2>ようこそ、ユーザーさん！</h2>
            <div id="habitList">
                {habits.map((habit, index) => (
                    <div key={index}>{habit}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="habit" 
                    value={habit} 
                    onChange={(e) => setHabit(e.target.value)} 
                    placeholder="新しい習慣" 
                    required 
                />
                <button type="submit">追加</button>
            </form>
        </div>
    );
};

export default Home;
