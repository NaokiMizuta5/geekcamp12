import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

interface BlockColumnProps {
  title: string;  // String型 (文字列)
  habitId: number;  // Int型 (数値)
}

// animated.Box の生成
const AnimatedBox = animated(Box);

const BlockColumn: React.FC<BlockColumnProps> = ({ title, habitId}) => {
  const [ count, setCount ] = useState(0);
  const [committingUsersCount, setCommittingUsersCount] = useState(0);
  const [pileUpUsersCount, setPileUpUsersCount] = useState(0);

  const today = dayjs().format('YYYY-MM-DD'); // 今日の日付を取得

  useEffect(() => {
    if (habitId !== undefined) {
      axios.get(`http://localhost:8000/api/habits/${habitId}/count/`)
        .then(response => {
          setCount(response.data.count);
        })
        .catch(error => {
          console.error("Error fetching habit count:", error);
        });

      // committing_users 数を取得
    axios.get(`http://localhost:8000/db/habit_item/committing_users/of/${habitId}/`)
    .then(response => {
      setCommittingUsersCount(response.data.length); // 配列の長さがユーザー数
    })
    .catch(error => {
      console.error('Error fetching committing users:', error);
    });
  
      // Pile up しているユーザー数をリアルタイムで取得
      const intervalId = setInterval(() => {
        axios.get(`http://localhost:8000/db/habit_item/piling_up_users/of/${habitId}/at/${today}/`)
          .then(response => {
            setPileUpUsersCount(response.data.length);
          })
          .catch(error => {
            console.error('Error fetching pile up users:', error);
          });
      }, 1000); // 1秒ごとに更新
  
      return () => clearInterval(intervalId); // コンポーネントがアンマウントされたときにクリーンアップ
    } else {
      // habitIdがundefinedの場合は初期値を設定
      setCount(0);
    }
  }, [habitId]); // habitIdが設定されたときに再度APIを呼び出す

  const handlePileUp = () => {
    // log_habitエンドポイントにPOSTリクエストを送信
    console.log('Sending habit_id:', habitId); // デバッグ用
    axios.post(`http://localhost:8000/api/habits/log_habit/`, {
      habit_id: habitId
    })
    .then(response => {
      console.log('Habit logged successfully:', response.data);
    })
    .catch(error => {
      console.error('Error logging habit:', error);
    });
  };

  // 色の配列を定義
  const colors = ['#ffffff', '#cce7ff', '#a2d2ff', '#ffc1cc', '#ffd6a5'];

  // カウントに基づいて色を決定
  const currentColor = colors[Math.floor((count-1) / 25) % colors.length];

  // 表示するブロック数を25個に制限し、25を超えると再び1から表示
  const displayedCount = count % 25 || 25;
  const blocks = Array.from({ length: displayedCount }, () => ({ color: currentColor }));

  // 新しいブロックに対するアニメーション設定
  const animationProps = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    reset: true,
  });

  // HSLを使用して背景色を計算
  const lightness = Math.max(95 - count * 2, 15); // Lightnessを減少させる（最小値20に制限）
  const backgroundColor = `hsl(197, 71%, ${lightness}%)`; // HSLのHue=197, Saturation=71%, Lightness=動的値

  return (
    <Box sx={{textAlign: 'center', height: '100%'}}>
      <Typography variant="h4" gutterBottom>
        {count}
      </Typography>
      <Typography variant="subtitle1">
        Committing Users: {committingUsersCount}
      </Typography>
      <Typography variant="subtitle2">
        Pile Up Users: {pileUpUsersCount} / {committingUsersCount}
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
        {blocks.map((block, index) => {
          return (
            <AnimatedBox
              key={index}
              style={index === blocks.length - 1 ? animationProps : {}}
              sx={{
                width: 40,
                height: 20,
                backgroundColor: block.color,
                borderRadius: '4px',
              }}
            />
          );
        })}
      </Box>
      <Typography variant="h6">{title}</Typography>
      <Button variant="contained" onClick={handlePileUp}>
        Pile up
      </Button>
    </Box>
  );
};


export default BlockColumn;
