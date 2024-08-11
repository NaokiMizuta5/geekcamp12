import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useState } from 'react';


interface ModalHabitProps {
  open: boolean;
  onClose: () => void;
  onSave: (habitData: { name: string }) => void;
}

const ModalHabit: React.FC<ModalHabitProps> = ({ open, onClose, onSave }) => {
  const [habitName, setHabitName] = useState('');
  const handleSave = () => {
    if (habitName.trim() !== '') {
      onSave({ name: habitName }); // 親コンポーネントのonSaveを呼び出す
      setHabitName(''); // フィールドをクリア
      onClose(); // モーダルを閉じる
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
