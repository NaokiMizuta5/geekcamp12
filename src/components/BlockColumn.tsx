import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { useState } from 'react';

interface BlockColumnProps {
  title: string;  // String型 (文字列)
  initialCount: number;  // Int型 (数値)
  coloredBlocks?: { color: string }[];  // オプションの配列で、各オブジェクトは color という文字列プロパティを持つ
}

const BlockColumn: React.FC<BlockColumnProps> = ({ title, initialCount, coloredBlocks = [] }) => {
  const totalBlocks = coloredBlocks.length + initialCount; // 合計ブロック数
  const blocks = [];
  const [ count, setCount ] = useState(initialCount);

  const handlePileUp = () => {
    setCount(count + 1);
  };

  // 白いブロックを作成
  for (let i = 0; i < count; i++) {
    blocks.push({ color: 'white' });
  }

  return (
    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center', height: '100%' }}>
      <Typography variant="h4" gutterBottom>
        {totalBlocks}
      </Typography>
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
