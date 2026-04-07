"use client";

import { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff, Lock, Person } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1b9330 0%, #2ecc71 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="xs" className="animate-fadeInUp">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="glassmorphism"
        >
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 2,
              bgcolor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
             <Typography variant="h4" fontWeight={700} color="primary">S</Typography>
          </Box>

          <Typography variant="h5" component="h1" fontWeight={600} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={4}>
            Dealer SIM Distribution Returns Portal
          </Typography>

          <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
            <Stack spacing={2.5}>
              <TextField
                fullWidth
                label="Partner ID / Email"
                placeholder="DL-88421"
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ cursor: "pointer", "&:hover": { color: "primary.main" } }}>
                  Remember me
                </Typography>
                <Link component={NextLink} href="/login/forgot-password" variant="caption" color="primary" sx={{ fontWeight: 600, textDecoration: "none" }}>
                  Forgot password?
                </Link>
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                type="submit"
                disabled={loading}
                sx={{
                  py: 1.8,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1rem",
                  bgcolor: "#1b9330",
                  boxShadow: "0 10px 20px rgba(27, 147, 48, 0.2)",
                  "&:hover": {
                    bgcolor: "#167a27",
                    transform: "translateY(-2px)",
                    boxShadow: "0 15px 30px rgba(27, 147, 48, 0.3)",
                  },
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {loading ? "Authenticating..." : "Sign In to Portal"}
              </Button>
            </Stack>
          </Box>

          <Typography variant="caption" color="text.secondary" sx={{ mt: 4, textAlign: "center" }}>
            Secure login using OAuth2/JWT tokens via API Gateway.
            <br />
            &copy; 2026 Safaricom PLC. All Rights Reserved.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
