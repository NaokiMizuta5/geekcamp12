import React, { useState } from 'react';
import CircularProgressBar from '../components/CircularProgressBar';
import './Friends.css';
import { Modal, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Friends: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState<any>(null);
    const [addFriendOpen, setAddFriendOpen] = useState(false);
    const [newFriendName, setNewFriendName] = useState('');

    const handleOpen = (friend: any) => {
        setSelectedFriend(friend);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddFriendOpen = () => {
        setAddFriendOpen(true);
    };

    const handleAddFriendClose = () => {
        setAddFriendOpen(false);
    };

    const handleAddFriendSubmit = () => {
        // 新しいフレンドの情報を処理するコードをここに追加
        console.log('New friend added:', newFriendName);
        setAddFriendOpen(false);
    };

    const handleDeleteFriend = () => {
        // フレンド削除の処理をここに追加
        console.log('Friend deleted:', selectedFriend?.name);
        setOpen(false);
    };

    const [friends, setFriends] = useState([
        { id: 1, name: 'ハチムラ ルイ', progress: 75, longestStreak: 25, habits: 10, total: 123, avatar: 'path/to/avatar1.png' },
        { id: 2, name: 'カワムラ ユウキ', progress: 75, longestStreak: 25, habits: 10, total: 123, avatar: 'path/to/avatar2.png' },
        { id: 3, name: 'ワタナベ ユウタ', progress: 75, longestStreak: 25, habits: 10, total: 123, avatar: 'path/to/avatar3.png' }
    ]);

    return (
        <div className="friends-container">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 800 }} aria-label="friend table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    onClick={handleAddFriendOpen}
                                >
                                    Add new friend
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {friends.map((friend) => (
                            <TableRow key={friend.id}>
                                <TableCell component="th" scope="row">
                                    <div className="friend-info">
                                        <img src={friend.avatar} alt={`${friend.name}'s avatar`} className="friend-avatar" />
                                        <span>{friend.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <div className="friend-status">
                                        <CircularProgressBar percentage={friend.progress} />
                                        <div className="friend-status-details">
                                            <div>
                                                <span>Longest Streak</span>
                                                <span>{friend.longestStreak}</span>
                                            </div>
                                            <div>
                                                <span>Habits</span>
                                                <span>{friend.habits}</span>
                                            </div>
                                            <div>
                                                <span>Total</span>
                                                <span>{friend.total}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => handleOpen(friend)}>
                                        <span className="dots">•••</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* フレンド追加モーダル */}
            <Modal
                open={addFriendOpen}
                onClose={handleAddFriendClose}
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
                    />
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleAddFriendClose} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleAddFriendSubmit} color="primary" variant="contained">
                            Add
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* フレンド詳細モーダル */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="friend-modal-title"
                aria-describedby="friend-modal-description"
            >
                <div className="modal-content">
                    <h2 id="friend-modal-title">{selectedFriend?.name}</h2>
                    <p id="friend-modal-description">Additional details or actions for {selectedFriend?.name}</p>
                    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleClose} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteFriend} color="error" variant="contained">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Friends;
