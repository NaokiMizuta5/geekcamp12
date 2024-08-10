import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

interface BlockColumnProps {
  title: string;  // String型 (文字列)
  habitId: number;  // Int型 (数値)
}

const BlockColumn: React.FC<BlockColumnProps> = ({ title, habitId }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // コンポーネントがマウントされたときに、初期カウントを取得
    axios.get(`http://localhost:8000/api/habits/${habitId}/count/`)
      .then(response => {
        setCount(response.data.count);
      })
      .catch(error => {
        console.error('Error fetching habit count:', error);
      });
  }, [habitId]);

  const handlePileUp = () => {
    // log_habitエンドポイントにPOSTリクエストを送信
    axios.post(`http://localhost:8000/api/habits/log_habit/`, {
      habit_id: habitId
    })
    .then(response => {
      // カウントを増やす
      setCount(count + 1);
      console.log('Habit logged successfully:', response.data);
    })
    .catch(error => {
      console.error('Error logging habit:', error);
    });
  };

  // 色の配列を定義
  const colors = ['white', 'lightblue', 'lightgreen', 'lightcoral', 'lightpink'];

  // カウントに基づいて色を決定
  const currentColor = colors[Math.floor((count-1) / 25) % colors.length];

  // 表示するブロック数をカウントに応じて計算（上限25）
  const displayedCount = count % 25 || 25;
  const blocks = Array(displayedCount).fill({ color: currentColor });

  // HSLを使用して背景色を計算
  const lightness = Math.max(95 - count * 2, 15); // Lightnessを減少させる（最小値20に制限）
  const backgroundColor = `hsl(197, 71%, ${lightness}%)`; // HSLのHue=197, Saturation=71%, Lightness=動的値

  return (
    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
      <Box
        sx={{
          height: 480,
          background: backgroundColor,
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 1,
          marginBottom: 2,
        }}
      >
        {/* ブロックを積み上げる */}
        {blocks.map((block, index) => (
          <Box
            key={index}
            sx={{
              width: 40,
              height: 20,
              backgroundColor: block.color,
            }}
          ></Box>
        ))}
      </Box>
      <Typography variant="h6">{title}</Typography>
      <Button variant="contained" onClick={handlePileUp}>
        Pile up
      </Button>
    </Paper>
  );
}

export default BlockColumn;
