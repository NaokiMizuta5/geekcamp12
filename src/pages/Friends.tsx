import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Friends: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Friends</h1>
            <p>Friends page content</p>
        </div>
    );
};
export default Friends;