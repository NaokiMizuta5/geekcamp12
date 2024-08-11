import React, { useState } from 'react';
import CircularProgressBar from '../components/CircularProgressBar';
import './Friends.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Avatar, Typography, IconButton, Modal, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import AddFriendModal from '../components/AddFriendModal';
import FriendDeleteModal from '../components/FriendDeleteModal';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface Friend {
    id: number;
    name: string;
    progress: number;
    longestStreak: number;
    habits: number;
    total: number;
    avatarColor: string; // 色を指定するためのプロパティ
    initial: string; // 頭文字を表示するためのプロパティ
}

const Friends: React.FC<{ userId: number }> = ({ userId }) => {
    const [open, setOpen] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
    const [addFriendOpen, setAddFriendOpen] = useState(false);
    const [friends, setFriends] = useState<Friend[]>([
        { id: 1, name: 'ロクムラ レイ', progress: 75, longestStreak: 25, habits: 10, total: 123, avatarColor: '#f44336', initial: 'R' },
        { id: 2, name: 'カワムロ コウキ', progress: 50, longestStreak: 18, habits: 8, total: 98, avatarColor: '#2196f3', initial: 'K' },
        { id: 3, name: 'ワタベ ユウタ', progress: 30, longestStreak: 30, habits: 15, total: 150, avatarColor: '#4caf50', initial: 'W' }
    ]);

    const [editProfileOpen, setEditProfileOpen] = useState(false);

    // User information state
    const [userName, setUserName] = useState("シミズ ナオタロウ");
    const [userAvatar, setUserAvatar] = useState("path/to/avatar.png"); // Replace with actual path
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // 追加: ファイル選択の状態

    const handleOpen = (friend: Friend) => {
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

    const handleEditProfileOpen = () => {
        setEditProfileOpen(true);
    };

    const handleEditProfileClose = () => {
        setEditProfileOpen(false);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setUserAvatar(objectUrl); // 画像プレビュー
        }
    };

    const handleAddFriendSubmit = async (newFriendId: number) => {
        try {
            const newFriend: Friend = {
                id: newFriendId,
                name: `新しいフレンド ${newFriendId}`,
                progress: 0,
                longestStreak: 0,
                habits: 0,
                total: 0,
                avatarColor: '#ff9800', // 追加フレンドの色
                initial: 'N' // 新しいフレンドの頭文字
            };

            setFriends(prevFriends => [...prevFriends, newFriend]);
            setAddFriendOpen(false);
        } catch (error) {
            console.error('Error adding friend:', error);
            alert('フレンドの追加に失敗しました。');
        }
    };

    const handleDeleteFriend = async () => {
        if (selectedFriend) {
            try {
                setFriends(prevFriends => prevFriends.filter(friend => friend.id !== selectedFriend.id));
                setOpen(false);
            } catch (error) {
                console.error('Error deleting friend', error);
                alert('フレンドの削除に失敗しました。');
            }
        }
    };

    const handleProfileSave = async () => {
        try {
            if (selectedFile) {
                const formData = new FormData();
                formData.append('avatar', selectedFile);

                const uploadResponse = await axios.post(`${apiUrl}/upload-avatar/`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const uploadedImageUrl = uploadResponse.data.url;
                setUserAvatar(uploadedImageUrl); // サーバーから返された画像URLを使用

                // ここで、サーバーにユーザー名とアバターURLを保存するためのリクエストを送信できます
                await axios.put(`${apiUrl}/db/user/update/${userId}/`, {
                    username: userName,
                    avatar: uploadedImageUrl
                });
            }

            setEditProfileOpen(false);
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('プロフィールの保存に失敗しました。');
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', marginLeft: '-700px', marginTop: '120px' }}>
            {/* Sidebarがここに来る場合、適切にコンポーネントをインポートしてください */}
            {/* <Sidebar /> */}

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    width: '100%',
                    maxWidth: 'calc(100vw - 240px)', // 240pxはSidebarの幅
                    overflowX: 'hidden',
                }}
            >
                {/* User profile section */}
                <div className="user-profile">
                    <Avatar sx={{ bgcolor: '#ff9800', width: 56, height: 56 }}>
                        S
                    </Avatar>
                    <div className="user-info">
                        <Typography className="username" variant="h6">{userName}</Typography>
                        <Typography className="user-id" variant="subtitle1">User Id: @naotaro</Typography>
                    </div>
                    <IconButton className="edit-button" onClick={handleEditProfileOpen}>
                        <EditIcon />
                    </IconButton>
                </div>

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
                                            <Avatar sx={{ bgcolor: friend.avatarColor, width: 40, height: 40 }}>
                                                {friend.initial}
                                            </Avatar>
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

                <AddFriendModal
                    open={addFriendOpen}
                    onClose={handleAddFriendClose}
                    onSave={handleAddFriendSubmit}
                />

                <FriendDeleteModal
                    open={open}
                    onClose={handleClose}
                    onDelete={handleDeleteFriend}
                    friendName={selectedFriend ? selectedFriend.name : ''}
                />

                <Modal open={editProfileOpen} onClose={handleEditProfileClose}>
                    <div className="modal-content">
                        <h2>Edit Profile</h2>
                        <TextField
                            label="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            type="file"
                            onChange={handleFileChange}
                            fullWidth
                            margin="normal"
                        />
                        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <Button onClick={handleEditProfileClose} color="secondary" variant="outlined">
                                Cancel
                            </Button>
                            <Button onClick={handleProfileSave} color="primary" variant="contained">
                                Save
                            </Button>
                        </div>
                    </div>
                </Modal>
            </Box>
        </Box>
    );
};

export default Friends;
