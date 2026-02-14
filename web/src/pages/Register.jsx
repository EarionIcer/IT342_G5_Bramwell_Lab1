import { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({ email: "", username: "", password: "" });

  const handleSubmit = async () => {
    const success = await register(form.email, form.username, form.password);
    alert(success ? "Registered successfully!" : "Registration failed");
  };

  return (
    <Container>
      <h2>Register</h2>
      <TextField label="Email" fullWidth onChange={e => setForm({ ...form, email: e.target.value })} />
      <TextField label="Username" fullWidth onChange={e => setForm({ ...form, username: e.target.value })} />
      <TextField label="Password" type="password" fullWidth onChange={e => setForm({ ...form, password: e.target.value })} />
      <Button variant="contained" onClick={handleSubmit}>Register</Button>
    </Container>
  );
}
