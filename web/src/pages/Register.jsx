import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!validatePassword(form.password)) {
      alert("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    const success = await register(form.email, form.username, form.password);
    if (success) {
      alert("Registered successfully!");
      navigate("/login");
    } else {
      alert("Registration failed");
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
        <Typography variant="h4" gutterBottom align="center">Register</Typography>
        <TextField
          label="Email"
          fullWidth
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Username"
          fullWidth
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <Button variant="contained" onClick={handleSubmit}>Register</Button>
        <Button variant="text" onClick={() => navigate("/login")}>
          Already have an account? Login
        </Button>
      </Box>
    </Container>
  );
}
