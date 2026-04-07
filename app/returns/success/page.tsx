"use client";

import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { CheckCircle, ContentCopy, Download, History } from "@mui/icons-material";

export default function SuccessPage() {
  const refNumber = "SIMRET-20240405-9921";

  return (
    <Container maxWidth="sm" className="animate-fadeInUp" sx={{ mt: 8 }}>
      <Stack spacing={4} alignItems="center">
        <CheckCircle color="success" sx={{ fontSize: 100, filter: "drop-shadow(0 0 10px rgba(27, 147, 48, 0.3))" }} />
        
        <Box textAlign="center">
          <Typography variant="h4" fontWeight={700}>Submission Successful!</Typography>
          <Typography variant="body1" color="text.secondary">
            Your SIM distribution return has been processed and stored for compliance auditing.
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ p: 3, width: "100%", borderRadius: 4, bgcolor: "#F8F9FA", border: "1px dashed #ccc" }}>
          <Stack spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: "uppercase" }}>
                Reference Number
              </Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h6" fontWeight={700} color="primary">{refNumber}</Typography>
                <Button size="small" startIcon={<ContentCopy />} sx={{ fontWeight: 600 }}>Copy</Button>
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Status</Typography>
              <Typography variant="body2" fontWeight={600} color="success.main">SUBMITTED</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="body2">Date</Typography>
              <Typography variant="body2" fontWeight={600}>April 5, 2026</Typography>
            </Box>
          </Stack>
        </Paper>

        <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
          <Button 
            fullWidth 
            variant="contained" 
            component={NextLink} 
            href="/returns/history"
            startIcon={<History />}
            sx={{ py: 2, fontWeight: 700 }}
          >
            View History
          </Button>
          <Button 
            fullWidth 
            variant="outlined" 
            startIcon={<Download />}
            sx={{ py: 2, fontWeight: 700 }}
          >
            Download Receipt
          </Button>
        </Stack>

        <Button component={NextLink} href="/" sx={{ fontWeight: 600 }}>
          Back to Dashboard
        </Button>
      </Stack>
    </Container>
  );
}
