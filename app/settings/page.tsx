"use client";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { MOCK_DEALER } from "@/lib/mockData";

export default function SettingsPage() {
  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <Box>
          <Typography variant="body1" color="text.secondary">Manage your profile and portal preferences.</Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 4, textAlign: "center", p: 4 }}>
              <Avatar sx={{ width: 100, height: 100, mx: "auto", mb: 2, bgcolor: "primary.main", fontSize: "2rem" }}>JS</Avatar>
              <Typography variant="h6" fontWeight={600}>{MOCK_DEALER.name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{MOCK_DEALER.email}</Typography>
              <Button variant="outlined" fullWidth sx={{ borderRadius: 2 }}>Change Photo</Button>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card variant="outlined" sx={{ borderRadius: 4 }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Profile Information</Typography>
                <Stack spacing={3} sx={{ mt: 3 }}>
                  <TextField fullWidth label="Full Name" defaultValue={MOCK_DEALER.name} />
                  <TextField fullWidth label="Email Address" defaultValue={MOCK_DEALER.email} />
                  <Grid container spacing={2}>
                    <Grid item xs={6}><TextField fullWidth label="Dealer ID" defaultValue={MOCK_DEALER.id} disabled /></Grid>
                    <Grid item xs={6}><TextField fullWidth label="Region" defaultValue={MOCK_DEALER.region} disabled /></Grid>
                  </Grid>
                </Stack>
                
                <Divider sx={{ my: 4 }} />
                
                <Typography variant="subtitle1" fontWeight={600} gutterBottom>Security</Typography>
                <Stack spacing={3} sx={{ mt: 3 }}>
                  <TextField fullWidth type="password" label="Current Password" />
                  <TextField fullWidth type="password" label="New Password" />
                  <Button variant="contained" sx={{ alignSelf: "flex-start", px: 4, py: 1.2, fontWeight: 700 }}>Save Changes</Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
