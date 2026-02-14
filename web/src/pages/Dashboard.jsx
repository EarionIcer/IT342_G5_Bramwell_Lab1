import { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
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
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <Typography variant="h4" align="center">Dashboard</Typography>
        {profile && (
          <>
            <Typography align="center">Email: {profile.email}</Typography>
            <Typography align="center">Username: {profile.username}</Typography>
          </>
        )}
        <Button variant="outlined" onClick={handleLogout}>Logout</Button>
      </Box>
    </Container>
  );
}
