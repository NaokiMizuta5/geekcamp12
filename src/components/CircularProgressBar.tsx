import React from 'react';
import './CircularProgressBar.css';

interface CircularProgressBarProps {
    percentage: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage }) => {
    const radius = 30; // 円の半径
    const circumference = 2 * Math.PI * radius; // 円の周囲長
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <svg className="progress-circle" width={120} height={120}>
            <circle
                className="progress-circle-background"
                cx="60"
                cy="60"
                r={radius}
                strokeWidth="10"
            />
            <circle
                className="progress-circle-bar"
                cx="60"
                cy="60"
                r={radius}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
            />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="20"
                fill="#333"
            >
                {percentage}%
            </text>
        </svg>
    );
};

export default CircularProgressBar;
