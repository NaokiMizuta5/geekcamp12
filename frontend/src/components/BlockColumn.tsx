import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
import dayjs from 'dayjs';

interface BlockColumnProps {
  title: string;  // String型 (文字列)
  habitId: number;  // Int型 (数値)
  userId: number;  // 現在のユーザーのID
}

// animated.Box の生成
const AnimatedBox = animated(Box);


const BlockColumn: React.FC<BlockColumnProps> = ({ title, habitId, userId}) => {
  const [ count, setCount ] = useState(0);
  const [committingUsersCount, setCommittingUsersCount] = useState(0);
  const [pileUpUsersCount, setPileUpUsersCount] = useState(0);

  const today = dayjs().format('YYYY-MM-DD'); // 今日の日付を取得

  useEffect(() => {
    if (habitId !== undefined) {
      // カウント数の取得
      axios.get(`${apiUrl}/db/habit_item/get/${habitId}/`)
        .then(response => {
          setCount(response.data.count);
        })
        .catch(error => {
          console.error("Error fetching habit count:", error);
          // カウント取得に失敗しても他の処理が実行される
        });
  
      // committing_users 数を取得
      axios.get(`${apiUrl}/db/habit_item/committing_users/of/${habitId}/`)
        .then(response => {
          if (response.data.length > 0) {
            setCommittingUsersCount(response.data.length); // 配列の長さがユーザー数
          } else {
            setCommittingUsersCount(0); // デフォルトで0に設定
          }
        })
        .catch(error => {
          console.error('Error fetching committing users:', error);
          setCommittingUsersCount(0); // エラー時も0に設定
        });
  
      // Pile up しているユーザー数をリアルタイムで取得
      const intervalId = setInterval(() => {
        axios.get(`${apiUrl}/db/habit_item/piling_up_users/of/${habitId}/at/${today}/`)
          .then(response => {
            if (response.data.length > 0) {
              setPileUpUsersCount(response.data.length);
            } else {
              setPileUpUsersCount(0); // デフォルトで0に設定
            }
          })
          .catch(error => {
            console.error('Error fetching pile up users:', error);
            setPileUpUsersCount(0); // エラー時も0に設定
          });
      }, 10000); // 1秒ごとに更新
  
      return () => clearInterval(intervalId); // コンポーネントがアンマウントされたときにクリーンアップ
    } else {
      // habitIdがundefinedの場合は初期値を設定
      setCount(0);
    }
  }, [habitId, today]);

  const handlePileUp = async () => {
    try {
      // Step 1: piling_up_users エンドポイントで同じ日に同じ項目を Pile Up したユーザーのリストを取得
      const pilingUpUsersResponse = await axios.get(`${apiUrl}/db/habit_item/piling_up_users/of/${habitId}/at/${today}/`);
  
      // レスポンスの内容をログで確認
      console.log('Piling Up Users Response:', pilingUpUsersResponse.data);
  
      let pilingUpUserIds: number[] = [];
      if (Array.isArray(pilingUpUsersResponse.data)) {
        pilingUpUserIds = pilingUpUsersResponse.data.map((status: any) => status.committed_by);
      } else if (typeof pilingUpUsersResponse.data === 'object' && Object.keys(pilingUpUsersResponse.data).length === 0) {
        // 空のオブジェクトが返ってきた場合、空の配列を代入
        pilingUpUserIds = [];
      } else {
        throw new Error('Expected an array but received a different type');
      }
  
      // Step 2: friends/of エンドポイントでフレンドのリストを取得し、フレンドじゃないIDを除外
      const friendsResponse = await axios.get(`${apiUrl}/db/user/friends/of/${userId}/`);
      const friendIds: number[] = friendsResponse.data.map((friend: any) => friend.id);
      console.log('Friend IDs:', friendIds);
  
      const filteredUserIds = pilingUpUserIds.filter(userId => friendIds.includes(userId));
      console.log('Filtered User IDs:', filteredUserIds);
  
      // Step 3: multiple_habit_status エンドポイントを使用して、リストの全ユーザーが Pile Up しているか確認
      const habitStatusResponse = await axios.get(`${apiUrl}/db/multiple_habit_status/get/`, {
        params: {
          habit_item: habitId,
          date_committed: today,
          committed_by__in: filteredUserIds.join(',')
        }
      });
      const habitStatuses = habitStatusResponse.data;
      console.log('Habit Statuses:', habitStatuses);

      // pileUpUsersCount を habitStatuses の長さで更新
      setPileUpUsersCount(habitStatuses.length);
  
      // フレンド全員が Pile Up している場合に最大連続日数を取得してカウントを更新
      if (habitStatuses.length === filteredUserIds.length) {
      // 最新の count を取得して更新
      const countResponse = await axios.get(`${apiUrl}/db/counts/get/`, {
        params: {
          habit_item: habitId,
          committed_by: userId
        }
      });

      console.log('Count Response:', countResponse.data); // Debug log

      const latestCount = countResponse.data.latest;
      console.log('Latest Count:', latestCount);

      setCount(latestCount);
    } else {
      console.log('Not all friends have piled up yet.');
    }

  } catch (error) {
    console.error('Error handling pile up:', error);
  }
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
