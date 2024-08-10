import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Settings: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Settings</h1>
            <p>Settings page content</p>
        </div>
    );
};
export default Settings;