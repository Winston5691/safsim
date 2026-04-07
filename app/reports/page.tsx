"use client";

import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  TextField,
  Collapse,
  Divider,
} from "@mui/material";
import { Download, ShowChart, Assignment, Add, Search, FilterList, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { InputAdornment } from "@mui/material";

export default function ReportsPage() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const reports = [
    { name: "Monthly SIM Sales Summary", cat: "Sales", date: "2024-03-31", status: "Ready" },
    { name: "Dealer Commission Statement", cat: "Financial", date: "2024-03-30", status: "Ready" },
    { name: "Reseller Performance Index", cat: "Operational", date: "2024-03-29", status: "Processing" },
  ];

  const filteredReports = reports.filter(r => {
    const q = searchQuery.toLowerCase();
    const matchSearch = r.name.toLowerCase().includes(q) || r.cat.toLowerCase().includes(q);
    const matchCat = filterCategory ? r.cat.toLowerCase().includes(filterCategory.toLowerCase()) : true;
    const matchStatus = filterStatus ? r.status === filterStatus : true;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <Container maxWidth="xl" className="animate-fadeInUp">
      <Stack spacing={2}>
        <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff", borderRadius: 0, mb: -2, zIndex: 1, position: "relative", mt: 1 }}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                placeholder="Search reports..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: 280 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ fontSize: 18, color: "text.disabled" }} />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 1.5, fontSize: "0.9rem" }
                }}
              />
              <Button
                size="small"
                startIcon={showAdvanced ? <ExpandLess /> : <FilterList />}
                onClick={() => setShowAdvanced(!showAdvanced)}
                sx={{ fontWeight: 600, color: showAdvanced ? "var(--safaricom-green)" : "text.secondary", textTransform: "none" }}
                variant="text"
              >
                {showAdvanced ? "Hide Filters" : "Advanced"}
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<Download />} size="small" sx={{ fontWeight: 600, borderRadius: 1.5, textTransform: "none" }}>Export All</Button>
              <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} size="small" sx={{ fontWeight: 600, bgcolor: "var(--safaricom-green)", borderRadius: 1.5, textTransform: "none" }}>Schedule Report</Button>
            </Stack>
          </Stack>

          <Collapse in={showAdvanced}>
            <Divider sx={{ my: 1.5 }} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap">
              <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ width: 160 }} SelectProps={{ native: true }}>
                <option value=""></option>
                <option value="Ready">Ready</option>
                <option value="Processing">Processing</option>
              </TextField>
              <TextField size="small" label="Category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} sx={{ width: 220 }} placeholder="Filter by category" />
              {(filterStatus || filterCategory) && (
                <Button size="small" onClick={() => { setFilterStatus(""); setFilterCategory(""); }} sx={{ fontWeight: 600, color: "error.main", textTransform: "none" }}>Clear</Button>
              )}
            </Stack>
          </Collapse>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="subtitle2" fontWeight={600} color="primary" gutterBottom>Quarterly Target</Typography>
                <Typography variant="h3" fontWeight={600}>KSh 1.2M</Typography>
                <Typography variant="caption" color="text.secondary">78% achieved as of today</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="subtitle2" fontWeight={600} color="success.main" gutterBottom>Active Resellers</Typography>
                <Typography variant="h3" fontWeight={600}>42</Typography>
                <Typography variant="caption" color="text.secondary">+5 new onboarding this month</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="subtitle2" fontWeight={600} color="warning.main" gutterBottom>Compliance Status</Typography>
                <Typography variant="h3" fontWeight={600}>94%</Typography>
                <Typography variant="caption" color="text.secondary">High visibility in Rift Valley cluster</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Report Name</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Last Updated</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredReports.map((row) => (
                  <TableRow key={row.name} hover>
                    <TableCell><Typography variant="body2" fontWeight={600}>{row.name}</Typography></TableCell>
                    <TableCell>{row.cat}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell><Chip label={row.status} size="small" color={row.status === "Ready" ? "success" : "warning"} variant="outlined" sx={{ fontWeight: 600 }} /></TableCell>
                    <TableCell align="right"><Button size="small" startIcon={<Download />}>Download</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #eee" }}>
            <Typography variant="caption" color="text.secondary">Showing {filteredReports.length} reports</Typography>
          </Box>
        </Card>

        {/* Schedule Report Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Schedule Automated Report</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField select fullWidth label="Report Type" defaultValue="sales">
                <MenuItem value="sales">Sales Summary</MenuItem>
                <MenuItem value="compliance">Compliance Audit</MenuItem>
                <MenuItem value="financial">Commission Statement</MenuItem>
              </TextField>
              <TextField select fullWidth label="Frequency" defaultValue="monthly">
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </TextField>
              <TextField fullWidth label="Email Recipients (Comma separated)" placeholder="finance@dealer.com, manager@dealer.com" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpen(false)} sx={{ fontWeight: 600, px: 4, bgcolor: "var(--safaricom-green)" }}>Schedule</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
