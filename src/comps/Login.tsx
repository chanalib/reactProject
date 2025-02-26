import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Paper, TextField, Button, Snackbar, Alert } from '@mui/material';

interface User {
  id: number;
  username: string;
  password: string;
}

export default function Login() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<{ username: string; password: string }>();

  const handleLogin = async (data: { username: string; password: string }) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Login failed");
      }
      const userData: User = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה לא ידועה");
    }
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '100px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center' }}>התחברות</h2>
        {error && (
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)} 
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity="error" variant="filled" onClose={() => setError(null)}>
              {error}
            </Alert>
          </Snackbar>
        )}
        {user ? (
          <p className="text-green-500">התחברת בהצלחה! ברוך הבא, {user.username}.</p>
        ) : (
          <form onSubmit={handleLoginSubmit(handleLogin)}>
            <TextField
              {...registerLogin("username", { required: "חובה להזין שם משתמש" })}
              label="שם משתמש"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!loginErrors.username}
              helperText={loginErrors.username ? loginErrors.username.message : ''}
            />
            <TextField
              {...registerLogin("password", { required: "חובה להזין סיסמה" })}
              label="סיסמה"
              variant="outlined"
              margin="normal"
              type="password"
              fullWidth
              error={!!loginErrors.password}
              helperText={loginErrors.password ? loginErrors.password.message : ''}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
              התחבר
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
}
