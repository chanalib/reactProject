import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Signup from './Signup'; 

interface SignupModalProps {
    onClose: () => void; // הוספת טיפוס לפונקציה
}

const SignupContainer = styled('div')({
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '400px',
    direction: 'rtl',
    textAlign: 'right',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
});

const SignupModal: React.FC<SignupModalProps> = ({ onClose }) => {
    return (
        <SignupContainer>
            <Button onClick={onClose} variant="outlined" color="primary" style={{ marginBottom: '16px' }}>
                סגור
            </Button>
            <Signup onClose={onClose} onSuccess={function (): void {
                throw new Error('Function not implemented.');
            } } /> {/* העברת הפונקציה */}
        </SignupContainer>
    );
}

export default SignupModal;
