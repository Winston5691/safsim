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
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Person,
  Google as GoogleIcon,
  Security as SecurityIcon
} from "@mui/icons-material";
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
        position: "relative",
        overflow: "hidden",
        p: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          width: "150%",
          height: "150%",
          background: "radial-gradient(circle, rgba(235, 25, 35, 0.05) 0%, transparent 70%)",
          top: "-25%",
          left: "-25%",
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="xs" className="animate-fadeInUp" sx={{ position: "relative", zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
          }}
          className="glassmorphism"
        >
          {/* Logo Section */}
          <Box
            sx={{
              width: 120,
              height: 48,
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://www.safaricom.co.ke/images/safaricom-25.gif"
              alt="Safaricom 25 Logo"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>

          <Typography variant="h5" component="h1" fontWeight={700} sx={{ color: "var(--safaricom-dark)", mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={4} sx={{ opacity: 0.8 }}>
            Dealer SIM Distribution Returns Portal
          </Typography>

          {/* Login Form */}
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
                  sx: { borderRadius: 2.5 }
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
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2.5 }
                }}
              />

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" sx={{ cursor: "pointer", fontWeight: 500, color: "text.secondary", "&:hover": { color: "var(--safaricom-green)" } }}>
                  Remember me
                </Typography>
                <Link component={NextLink} href="/login/forgot-password" variant="caption" sx={{ fontWeight: 600, color: "--safaricom-green", textDecoration: "none" }}>
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
                  py: 1.5,
                  borderRadius: 2.5,
                  fontWeight: 600,
                  fontSize: "1rem",
                  bgcolor: "var(--safaricom-green)",
                  textTransform: "none",
                  boxShadow: "0 8px 16px rgba(27, 147, 48, 0.2)",
                  "&:hover": {
                    bgcolor: "#167a27",
                    transform: "translateY(-1px)",
                    boxShadow: "0 12px 24px rgba(27, 147, 48, 0.3)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? "Authenticating..." : "Sign In to Portal"}
              </Button>
            </Stack>
          </Box>

          {/* Divider */}
          <Box sx={{ width: "100%", my: 4, display: "flex", alignItems: "center" }}>
            <Divider sx={{ flex: 1, borderColor: "rgba(0,0,0,0.06)" }} />
            <Typography variant="caption" sx={{ px: 2, color: "text.secondary", fontWeight: 500 }}>
              OR LOGIN WITH
            </Typography>
            <Divider sx={{ flex: 1, borderColor: "rgba(0,0,0,0.06)" }} />
          </Box>

          {/* Social Login Options */}
          <Stack direction="column" spacing={2} sx={{ width: "100%" }}>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon />}
              sx={{
                py: 1.2,
                borderRadius: 2.5,
                fontWeight: 600,
                textTransform: "none",
                borderColor: "rgba(0,0,0,0.1)",
                color: "var(--safaricom-dark)",
                "&:hover": {
                  borderColor: "#4285F4",
                  bgcolor: "rgba(66, 133, 244, 0.02)",
                }
              }}
            >
              Sign in with Google
            </Button>
          </Stack>

          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5, fontWeight: 500 }}>
              Trouble logging in? <Link component={NextLink} href="/support" sx={{ color: "var(--safaricom-green)", textDecoration: "none" }}>Contact Support</Link>
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.6 }}>
              &copy; 2026 Safaricom PLC. All Rights Reserved.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
