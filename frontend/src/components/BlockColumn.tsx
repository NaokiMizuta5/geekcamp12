import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { useState, useEffect } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface BlockColumnProps {
  title: string;
  habitId: number;
  userId: number;
}

const AnimatedBox = animated(Box);

const BlockColumn: React.FC<BlockColumnProps> = ({ title, habitId, userId}) => {
  const [ count, setCount ] = useState(0);
  const [committingUserIds, setCommittingUserIds] = useState<number[]>([]);
  const [committingUsersCount, setCommittingUsersCount] = useState<number>(0);
  const [pilingUpUserIds, setPilingUpUserIds] = useState<number[]>([]);
  const [pilingUpUsersCount, setPilingUpUsersCount] = useState<number>(0);
  const today = dayjs().utc().format('YYYY-MM-DD'); // 今日の日付を取得(UTC)

  // useEffect フックを使用して、コンポーネントがマウントされたときにデータを取得
  useEffect(() => {
    if (habitId !== undefined) {
      axios.get(`${apiUrl}/db/multiple_habit_status/get/`, {
        params: {
          habit_item: habitId,
          committed_by: userId
        }
      }).then(response => {
          setCount(response.data.length);
          console.log('multiple_habit_status.length:', response.data.length);
        })
        .catch(error => {
          console.error("Error fetching habit count:", error);
        });

      const fetch_Commit_pileup_Count = async () => {
        try {
          // committing_users数の取得
          const committingUsersResponse = await axios.get(`${apiUrl}/db/habit_item/committing_users/of/${habitId}/`);
          const commituserIds: number[] = committingUsersResponse.data.map((status: any) => status.id);
          setCommittingUserIds(commituserIds);
          setCommittingUsersCount(commituserIds.length);
          console.log('Committing User IDs:', committingUserIds);
          console.log('Committing User Counts:', committingUsersCount);

          // piling_up_users数の取得
          const pilingUpUsersResponse = await axios.get(`${apiUrl}/db/habit_item/piling_up_users/of/${habitId}/at/${today}/`);
          if (Array.isArray(pilingUpUsersResponse.data)) {
            const pileupuserIds: number[] = pilingUpUsersResponse.data.map((status: any) => status.id);
            setPilingUpUserIds(pileupuserIds);
            setPilingUpUsersCount(pileupuserIds.length);
            console.log('Piling Up User IDs:', pilingUpUserIds);
            console.log('Piling Up User Counts:', pilingUpUsersCount);
          } else if (Object.keys(pilingUpUsersResponse.data).length === 0) {
            console.log('No piling up users found.');
            setPilingUpUserIds([]);  // 空の配列を設定
            setPilingUpUsersCount(0);  // カウントを0に設定
          } else {
              console.error('Unexpected data format for pilingUpUsersResponse:', pilingUpUsersResponse.data);
          }
        } catch (error) {
          console.error('Error fetching committing & pile up users count:', error);
        }
      };
      // 非同期処理を実行
      fetch_Commit_pileup_Count();
    }
  }, [habitId, userId, today, setCommittingUsersCount, setPilingUpUsersCount]);

  const handlePileUp = async () => {
    // Pile Up したユーザーを記録
    await axios.post(`${apiUrl}/progress/record/`, {
      habit_item: habitId,
      committed_by: userId
    });

    // ユーザーの習慣達成状況を取得
    const { data: habitStatus } = await axios.get(`${apiUrl}/db/multiple_habit_status/get/`, {
      params: {
        habit_item: habitId,
        committed_by: userId
      }
    });
    setCount(habitStatus.length);

    try {
      // committing_users数の確認
      console.log('committing user counts external:', committingUsersCount);

      // piling_up_users エンドポイントで同じ日に同じ項目を Pile Up したユーザーのリストを取得
      const pilingUpUsersResponse = await axios.get(`${apiUrl}/db/habit_item/piling_up_users/of/${habitId}/at/${today}/`);
      let pilingUpUserIds: number[] = [];
      if (Array.isArray(pilingUpUsersResponse.data)) {
        pilingUpUserIds = pilingUpUsersResponse.data.map((status: any) => status.id);
      } else if (typeof pilingUpUsersResponse.data === 'object' && Object.keys(pilingUpUsersResponse.data).length === 0) {
        pilingUpUserIds = [];// 空のオブジェクトが返ってきた場合、空の配列を代入
      } else {
        throw new Error('Expected an array but received a different type');
      }
      console.log('Piling Up User IDs(hable):', pilingUpUserIds);
      console.log('Piling Up User IDs Length(hable):', pilingUpUserIds.length);
      setPilingUpUsersCount(pilingUpUserIds.length);

      // PileUpUsersCount が committingUsersCount と同じ場合、最大連続日数を取得してカウントを更新
      if (pilingUpUserIds.length === committingUsersCount) {
        const countResponse = await axios.get(`${apiUrl}/db/counts/get/`, {
          params: {
            habit_item: habitId,
            committed_by: userId
          }
        });
        const latestCount = countResponse.data.latest;
        setCount(latestCount);
      } else {
        console.log('Not all friends have piled up yet.');
      }

      /*
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

      // setCount(latestCount);
      setPileUpUsersCount(habitStatuses.length);
    } else {
      console.log('Not all friends have piled up yet.');
    }
      */
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
        Pile Up Users: {pilingUpUsersCount} / {committingUsersCount}
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
