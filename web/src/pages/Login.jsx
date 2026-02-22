import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const success = await login(form.email, form.password);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <Typography variant="h4" gutterBottom align="center">Login</Typography>
        <TextField
          label="Email"
          fullWidth
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>Login</Button>
        <Button variant="text" onClick={() => navigate("/register")}>
          Don’t have an account? Register
        </Button>
      </Box>
    </Container>
  );
}
