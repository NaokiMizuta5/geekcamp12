import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useState } from 'react';

interface BlockColumnProps {
  title: string;  // String型 (文字列)
  initialCount: number;  // Int型 (数値)
  coloredBlocks?: { color: string }[];  // オプションの配列で、各オブジェクトは color という文字列プロパティを持つ
}

const BlockColumn: React.FC<BlockColumnProps> = ({ title, initialCount,  coloredBlocks = []}) => {

  const [ count, setCount ] = useState(initialCount);

  const handlePileUp = () => {
    setCount(count + 1);
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
    <Box sx={{textAlign: 'center', height: '100%'}}>
      <Typography variant="h4" gutterBottom>
        {count}
      </Typography>
      <Box
        sx={{
          height: 600,
          background: backgroundColor,
          display: 'flex',
          flexDirection: 'column-reverse',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 1,
          marginBottom: 2,
          padding: 1,
          borderRadius: '8px',
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
              borderRadius: '4px',
            }}
          ></Box>
        ))}
      </Box>
      <Typography variant="h6">{title}</Typography>
      <Button variant="contained" onClick={handlePileUp}>
        Pile up
      </Button>
    </Box>
  );
}

export default BlockColumn;
