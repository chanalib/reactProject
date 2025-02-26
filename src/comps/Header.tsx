import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { UserContext } from './UserContext';

interface HeaderProps {
    onSignupClick: () => void; // הוספת טיפוס לפונקציה
}

const buttons = [
    { title: 'מתכונים', width: '25%', requiresLogin: true },
    { title: 'התחברות', width: '25%', requiresLogin: false },
    { title: 'הרשמה', width: '25%', requiresLogin: false },
    { title: 'דף הבית', width: '25%', requiresLogin: false }
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
    const isLogin = !!context?.user;

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
            {buttons.map((button) => {
                if (button.requiresLogin && !isLogin) {
                    return null;
                }
                return (
                    <ImageButton
                        key={button.title}
                        style={{ width: button.width }}
                        onClick={button.title === 'הרשמה' ? onSignupClick : undefined}
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
                );
            })}
        </Box>
    );
}

export default Header;
