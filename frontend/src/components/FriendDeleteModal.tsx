import React from 'react';
import { Modal, Button } from '@mui/material';

interface FriendDeleteModalProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    friendName: string;
}

const FriendDeleteModal: React.FC<FriendDeleteModalProps> = ({ open, onClose, onDelete, friendName }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="friend-modal-title"
            aria-describedby="friend-modal-description"
        >
            <div className="modal-content">
                <h2 id="friend-modal-title">{friendName}</h2>
                <p id="friend-modal-description">Are you sure you want to delete this friend?</p>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={onDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default FriendDeleteModal;
