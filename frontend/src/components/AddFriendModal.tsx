import React, { useState } from 'react';
import { Modal, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

interface AddFriendModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (friendId: number) => void;
}

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const AddFriendModal: React.FC<AddFriendModalProps> = ({ open, onClose, onSave }) => {
    const [newFriendName, setNewFriendName] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSave = async () => {
        try {
            // ユーザー名でユーザーを検索
            const response = await axios.get(`${apiUrl}/db/users/get/`, {
                params: { username: newFriendName }
            });

            const users = response.data;

            if (users.length === 1) {
                // 一致するユーザーが1人見つかった場合、そのユーザーIDをフレンドとして追加
                const newFriendId = users[0].id;
                onSave(newFriendId);
                setNewFriendName(''); // テキストフィールドをクリア
                setErrorMessage(null); // エラーメッセージをクリア
                onClose();
            } else if (users.length > 1) {
                setErrorMessage('複数のユーザーが見つかりました。ユーザー名をさらに詳細に入力してください。');
            } else {
                setErrorMessage('ユーザーが見つかりませんでした。');
            }
        } catch (error) {
            console.error('Error searching for user:', error);
            setErrorMessage('エラーが発生しました。再試行してください。');
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-friend-modal-title"
            aria-describedby="add-friend-modal-description"
        >
            <div className="modal-content">
                <h2 id="add-friend-modal-title">Add New Friend</h2>
                <TextField
                    label="Friend Name"
                    value={newFriendName}
                    onChange={(e) => setNewFriendName(e.target.value)}
                    fullWidth
                    error={!!errorMessage}
                    helperText={errorMessage}
                />
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" variant="contained">
                        Add
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddFriendModal;
