import { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch(`/api/user/me?email=${user.email}`);
      if (res.ok) {
        setProfile(await res.json());
      }
    };
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Container>
      <Typography variant="h4">Dashboard</Typography>
      {profile && (
        <>
          <Typography>Email: {profile.email}</Typography>
          <Typography>Username: {profile.username}</Typography>
        </>
      )}
      <Button variant="outlined" onClick={handleLogout}>Logout</Button>
    </Container>
  );
}
