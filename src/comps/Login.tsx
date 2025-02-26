import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { UserContext } from './UserContext';
import axios from 'axios';

interface LoginFormData {
    username: string;
    password: string;
}

const Login: React.FC<{ onSignupClick: () => void; onClose: () => void }> = ({ onSignupClick, onClose }) => {
    const userContext = useContext(UserContext);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>();

    const onSubmit = async (data: LoginFormData) => {
        setError(null);
        try {
            const response = await axios.post("http://localhost:8080/api/user/login", {
                username: data.username,
                password: data.password,
            });

            if (response.data.id) {
                userContext?.setUser({ id: response.data.id, username: data.username });
                setSuccess(true);
                // סוגר את הטופס אחרי הצלחה
            } else {
                setError("שגיאה: לא נמצא משתמש עם הפרטים שסיפקת.");
            }
        } catch (err) {
            setError("שגיאה בהתחברות, אנא נסה שוב.");
        }
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '100px' }}>
            <Paper elevation={3} style={{ padding: '20px', position: 'relative' }}>
                <h2 style={{ textAlign: 'center' }}>התחברות</h2>
                <IconButton
                    style={{ position: 'absolute', right: 10, top: 10 }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
                {error && (
                    <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)} 
                              anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                        <Alert severity="error" variant="filled" onClose={() => setError(null)}>
                            {error}
                        </Alert>
                    </Snackbar>
                )}
                {success ? (
                    <p className="text-green-500">התחברת בהצלחה!</p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("username", { required: "חובה להזין שם משתמש" })}
                            label="שם משתמש"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!errors.username}
                            helperText={errors.username ? errors.username.message : ''}
                        />
                        <TextField
                            {...register("password", { required: "חובה להזין סיסמה" })}
                            label="סיסמה"
                            variant="outlined"
                            margin="normal"
                            type="password"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password ? errors.password.message : ''}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                            התחבר
                        </Button>
                        <Button onClick={onSignupClick} variant="text" fullWidth style={{ marginTop: '16px' }}>
                            עדיין אינך רשום? הרשמה
                        </Button>
                    </form>
                )}
            </Paper>
        </Container>
    );
};

export default Login;
