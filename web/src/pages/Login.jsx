import { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const success = await login(form.email, form.password);
    if (success) navigate("/dashboard");
    else alert("Invalid credentials");
  };

  return (
    <Container>
      <h2>Login</h2>
      <TextField label="Email" fullWidth onChange={e => setForm({ ...form, email: e.target.value })} />
      <TextField label="Password" type="password" fullWidth onChange={e => setForm({ ...form, password: e.target.value })} />
      <Button variant="contained" onClick={handleSubmit}>Login</Button>
    </Container>
  );
}
