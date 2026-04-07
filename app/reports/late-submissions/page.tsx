"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  Chip,
} from "@mui/material";
import {
  WarningAmber,
  TableChart,
  PictureAsPdf,
  Refresh,
  EventBusy,
} from "@mui/icons-material";
import { SuiDatePicker } from "@safaricom/sui";

export default function LateSubmissionsPage() {
  return (
    <Container maxWidth="xl" className="animate-fadeInUp">
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, alignItems: "flex-end" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Button variant="outlined" startIcon={<TableChart />} size="small" sx={{ borderRadius: 2, fontWeight: 600 }}>Export Excel</Button>
            <Button variant="outlined" startIcon={<PictureAsPdf />} size="small" sx={{ borderRadius: 2, fontWeight: 600 }}>Export PDF</Button>
          </Stack>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 4, p: 3, borderLeft: "6px solid #E05D5D" }}>
          <Typography variant="subtitle2" fontWeight={700} color="error" sx={{ mb: 2 }}>GENERATE ANALYSIS BY DATE RANGE</Typography>
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item xs={12} md={4}>
               <SuiDatePicker label="Start Date" onChange={() => {}} format="DD/MM/YYYY" slotProps={{ textField: { fullWidth: true, size: "small" } }} />
            </Grid>
            <Grid item xs={12} md={4}>
               <SuiDatePicker label="End Date" onChange={() => {}} format="DD/MM/YYYY" slotProps={{ textField: { fullWidth: true, size: "small" } }} />
            </Grid>
            <Grid item xs={12} md={4}>
               <Button 
                 fullWidth 
                 variant="contained" 
                 color="error"
                 startIcon={<Refresh />} 
                 sx={{ height: 40, fontWeight: 700 }}
               >
                 RUN ANALYSIS
               </Button>
            </Grid>
          </Grid>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <Box sx={{ p: 3, borderBottom: "1px solid #eee" }}>
            <Typography variant="h6" fontWeight={700}>Exceptions & Compliance Gaps</Typography>
          </Box>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Submission ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Expected Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Actual Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Days Overdue</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[
                  { id: "SUB-8821", type: "SIM Return", exp: "2024-03-05", act: "2024-03-12", delay: "7 Days", status: "Flagged" },
                  { id: "SUB-8902", type: "Monthly Stock Report", exp: "2024-03-01", act: "2024-03-10", delay: "9 Days", status: "Resolved" },
                  { id: "SUB-9111", type: "SIM Return", exp: "2024-04-05", act: "2024-04-06", delay: "1 Day", status: "Pending Review" },
                ].map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell sx={{ fontWeight: 600 }}>{row.id}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell color="text.secondary">{row.exp}</TableCell>
                    <TableCell align="left">
                       <Typography variant="body2" color="error.main" fontWeight={600}>{row.act}</Typography>
                    </TableCell>
                    <TableCell>
                       <Chip label={row.delay} size="small" color="error" variant="outlined" sx={{ fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        size="small"
                        color={row.status === "Resolved" ? "success" : "warning"}
                        sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Stack>
    </Container>
  );
}
