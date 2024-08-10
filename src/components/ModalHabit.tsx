import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';


interface ModalHabitProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;  // 変更: API呼び出し後の処理に対応
}

const ModalHabit: React.FC<ModalHabitProps> = ({ open, onClose, onSave }) => {
  const [habitName, setHabitName] = useState('');

  const handleSave = async () => {
    if (habitName.trim() !== '') {
      try {
        // create_habit APIにPOSTリクエストを送信
        await axios.post('http://localhost:8000/api/create_habit/', {
          name: habitName,
        });
        setHabitName('');
        onClose();
        onSave();  // 追加: 成功後の処理（例: 親コンポーネントでリストを更新）
      } catch (error) {
        console.error('Error creating habit:', error);
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
