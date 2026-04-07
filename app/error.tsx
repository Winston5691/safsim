"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { ErrorOutline, Refresh } from "@mui/icons-material";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          minHeight: "80vh", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center", 
          justifyContent: "center",
          textAlign: "center"
        }}
      >
        <ErrorOutline color="error" sx={{ fontSize: 100, mb: 4 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          We encountered an unexpected error while processing your request. 
          Please try refreshing the page or contacting support if the issue persists.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" size="large" onClick={() => reset()} startIcon={<Refresh />}>
            Try Again
          </Button>
          <Button variant="outlined" size="large" onClick={() => window.location.href = "/"}>
            Return Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
