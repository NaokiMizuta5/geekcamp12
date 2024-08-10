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

  const blocks = [];
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

  // 白いブロックを作成
  for (let i = 0; i < count; i++) {
    blocks.push({ color: 'white' });
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
      <Box
        sx={{
          height: 480,
          background: 'skyblue',
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
