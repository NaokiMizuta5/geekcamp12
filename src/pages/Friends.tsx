import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgressBar from '../components/CircularProgressBar';
import './Friends.css';

const Friends: React.FC = () => {
    const navigate = useNavigate();

    // フレンドリストのデータを定義
    const [friends, setFriends] = useState([
        { id: 1, name: 'シミズ ナオタロウ', progress: 75, longestStreak: 25, habits: 10, total: 123 },
        { id: 2, name: 'タカハシ ヒロミツ', progress: 50, longestStreak: 18, habits: 8, total: 98 },
        { id: 3, name: 'サトウ アユミ', progress: 30, longestStreak: 30, habits: 15, total: 150 }
    ]);

    return (
        <div className="friends-container">
            <h1>Friends list</h1>
            <div className="friends-list">
                {friends.map(friend => (
                    <div key={friend.id} className="friend-card">
                        <div className="friend-info">
                            <div className="friend-avatar">
                                <img src={`https://via.placeholder.com/50?text=${friend.name[0]}`} alt="avatar" />
                            </div>
                            <div className="friend-details">
                                <h2>{friend.name}</h2>
                            </div>
                        </div>
                        <div className="progress-container">
                            <span className="achievement-label">achievement rate</span>
                            <CircularProgressBar percentage={friend.progress} />
                        </div>
                        <div className="friend-stats">
                            <div>
                                <span>Longest Streak</span>
                                <span>{friend.longestStreak}</span>
                            </div>
                            <div>
                                <span>Habits</span>
                                <span>{friend.habits}</span>
                            </div>
                            <div>
                                <span>Total</span>
                                <span>{friend.total}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Friends;