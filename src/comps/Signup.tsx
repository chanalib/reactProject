import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

interface SignupFormData {
    UserName: string;
    Password: string;
    Name: string;
    Phone: string;
    Email: string;
    Tz: string;
}

const Signup: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
    const userContext = useContext(UserContext);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    if (!userContext) {
        throw new Error("UserContext is undefined. Make sure to wrap your component with UserProvider.");
    }

    const { setUser } = userContext;

    const { register, handleSubmit } = useForm<SignupFormData>();

    const onSubmit = async (data: SignupFormData) => {
        try {
            const response = await axios.post("http://localhost:8080/api/user/sighin", {
                UserName: data.UserName,
                Password: data.Password,
                Name: data.Name,
                Phone: data.Phone,
                Email: data.Email,
                Tz: data.Tz,
            });
            console.log(response.data);

            if (response.data.message === "User already exists") {
                setError("כבר נרשמת!");
            }
            

            if (response.data.user) {
                setUser({ id: response.data.user.id, username: response.data.user.username });
                setSuccess(true);
                onSuccess();
                onClose();
                navigate('/home');
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            console.error('Error during signup:', axiosError.response?.data || axiosError.message);
            if (axios.isAxiosError(axiosError)) {
                setError("שגיאה בהרשמה, אנא נסה שוב.");
            } else {
                setError("שגיאה לא צפויה, אנא נסה שוב.");
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} style={{ padding: '20px', position: 'relative' }}>
                <h2 style={{ textAlign: 'center' }}>הרשמה</h2>
                <IconButton
                    style={{ position: 'absolute', right: 10, top: 10 }}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                    <Alert severity="error" variant="filled" onClose={() => setError(null)}>
                        {error}
                    </Alert>
                </Snackbar>

                <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
                    <Alert severity="success" variant="filled" onClose={() => setSuccess(false)}>
                        התחברת בהצלחה!
                    </Alert>
                </Snackbar>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("UserName")}
                        label="שם משתמש"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        {...register("Password")}
                        label="סיסמה"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth
                    />
                    <TextField
                        {...register("Name")}
                        label="שם"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        {...register("Phone")}
                        label="טלפון"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <TextField
                        {...register("Email")}
                        label="מייל"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        {...register("Tz")}
                        label="מספר זהות"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                        הרשמה
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Signup;
