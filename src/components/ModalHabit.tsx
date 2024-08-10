import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';


interface ModalHabitProps {
  open: boolean;
  onClose: () => void;
  onSave: (habitItem: HabitItem) => void;
  userId: number;
}

interface HabitItem {
  id: number;
  name: string;
  created_by: string;
}

const ModalHabit: React.FC<ModalHabitProps> = ({ open, onClose, onSave, userId }) => {
  const [habitName, setHabitName] = useState('');

  const handleSave = async () => {
    if (habitName.trim() !== '') {
      try {
        const response = await axios.post(`${apiUrl}/habits/create/`, {
          name: habitName,
          created_by: userId,  // ここで現在のユーザーIDを送信
        });

        const newHabitItem: HabitItem = {
          id: response.data.habit_item_id,
          name: response.data.name,
          created_by: userId.toString(),
        };

        console.log('Habit item ID:', newHabitItem.id);
  
        // Habitが作成された後、関連するHabit Statusを作成
        const habitStatusResponse = await axios.post(`${apiUrl}/progress/record/`, {
          habit_item: newHabitItem.id,
          committed_by: userId
        });

        console.log('Habit Status Created:', habitStatusResponse.data);
  
        onSave(newHabitItem);  // 新しく作成された HabitItem を onSave で渡す
        setHabitName('');  // フィールドをクリア
        onClose();  // モーダルを閉じる
      } catch (error) {
        console.error('Error creating habit or habit status:', error);
      }
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Make a New Habit!</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Habit Name"
          type="text"
          fullWidth
          variant="outlined"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalHabit;
