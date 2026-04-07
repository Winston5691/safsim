"use client";

import NextLink from "next/link";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  TextField,
  Typography,
  IconButton,
  Alert,
} from "@mui/material";
import { ArrowBack, Email } from "@mui/icons-material";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1B9330 0%, #000000 100%)",
        p: 3,
      }}
    >
      <Container maxWidth="xs" className="animate-fadeInUp">
        <Card sx={{ borderRadius: 6, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)", bgcolor: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)" }}>
          <CardContent sx={{ p: 5 }}>
            <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
              <IconButton component={NextLink} href="/login" size="small" sx={{ mr: 1, bgcolor: "rgba(0,0,0,0.05)" }}>
                <ArrowBack fontSize="small" />
              </IconButton>
              <Typography variant="h5" fontWeight={700}>Reset Password</Typography>
            </Box>

            {submitted ? (
              <Stack spacing={3}>
                <Alert severity="success" sx={{ borderRadius: 3 }}>
                  Password reset link has been sent to your registered email address.
                </Alert>
                <Button component={NextLink} href="/login" fullWidth variant="contained" sx={{ py: 1.5, borderRadius: 2, fontWeight: 700 }}>
                  Back to Login
                </Button>
              </Stack>
            ) : (
              <Stack spacing={3}>
                <Typography variant="body2" color="text.secondary">
                  Enter your email address and we'll send you a link to reset your password.
                </Typography>
                <TextField
                  fullWidth
                  label="Email Address"
                  placeholder="name@dealer.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{ startAdornment: <Email sx={{ color: "action.active", mr: 1 }} /> }}
                />
                <Button 
                  fullWidth 
                  variant="contained" 
                  onClick={() => setSubmitted(true)}
                  disabled={!email}
                  sx={{ py: 1.5, borderRadius: 2, fontWeight: 700, bgcolor: "var(--safaricom-green)" }}
                >
                  Send Reset Link
                </Button>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
