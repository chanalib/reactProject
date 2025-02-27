import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from './UserContext';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    onSignupClick: () => void;
}

const buttons = [
    { title: 'מתכונים', width: '25%' },
    { title: 'התחברות', width: '25%' },
    { title: 'הרשמה', width: '25%' },
    { title: 'דף הבית', width: '25%' }
];

const ImageButton = styled(Button)(({ theme }) => ({
    position: 'relative',
    height: 120,
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const Header: React.FC<HeaderProps> = ({ onSignupClick }) => {
    const context = useContext(UserContext);
    const [showLogin, setShowLogin] = useState(false);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleRecipesClick = () => {
        navigate('/recipes');
    };

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            {buttons.map((button) => (
                <ImageButton
                    key={button.title}
                    style={{ width: button.width }}
                    onClick={button.title === 'התחברות' ? handleLoginClick : 
                              button.title === 'הרשמה' ? onSignupClick : 
                              button.title === 'מתכונים' ? handleRecipesClick : 
                              undefined}
                >
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        sx={(theme) => ({
                            position: 'relative',
                            p: 2,
                            pt: 1,
                            pb: `calc(${theme.spacing(1)} + 6px)`,
                        })}
                    >
                        {button.title}
                    </Typography>
                </ImageButton>
            ))}
            {showLogin && <Login onSignupClick={onSignupClick} onClose={handleCloseLogin} />}
        </Box>
    );
};

export default Header;
