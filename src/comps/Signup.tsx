import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // ייבוא ה-UserContext

interface SignupFormData {
    UserName: string;
    Password: string;
    Name: string;
    Phone: string;
    Email: string;
    Tz: string;
}

const Signup: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
    const userContext = useContext(UserContext); // קבלת ה-context
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    // בדוק אם ה-context קיים
    if (!userContext) {
        throw new Error("UserContext is undefined. Make sure to wrap your component with UserProvider.");
    }

    const { setUser } = userContext; // עכשיו setUser בטוח קיים

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>();

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
                return;
            }
    
            // בדוק אם ה-user קיים בתגובה
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
                        {...register("UserName", { required: "חובה להזין שם משתמש" })}
                        label="שם משתמש"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={!!errors.UserName}
                        helperText={errors.UserName ? errors.UserName.message : ''}
                    />
                    <TextField
                        {...register("Password", { required: "חובה להזין סיסמה" })}
                        label="סיסמה"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        fullWidth
                        error={!!errors.Password}
                        helperText={errors.Password ? errors.Password.message : ''}
                    />סגור
                    <TextField
                        {...register("Name", { required: "חובה להזין שם" })}
                        label="שם"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={!!errors.Name}
                        helperText={errors.Name ? errors.Name.message : ''}
                    />
                    <TextField
                        {...register("Phone", { required: "חובה להזין מספר טלפון" })}
                        label="טלפון"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={!!errors.Phone}
                        helperText={errors.Phone ? errors.Phone.message : ''}
                    />
                    <TextField
                        {...register("Email", { required: "חובה להזין כתובת מייל" })}
                        label="מייל"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        fullWidth
                        error={!!errors.Email}
                        helperText={errors.Email ? errors.Email.message : ''}
                    />
                    <TextField
                        {...register("Tz", { required: "חובה להזין מספר זהות" })}
                        label="מספר זהות"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        error={!!errors.Tz}
                        helperText={errors.Tz ? errors.Tz.message : ''}
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
