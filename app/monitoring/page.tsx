"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  Button,
  IconButton,
  Tooltip,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  TrendingUp,
  TrendingDown,
  WarningAmber,
  CheckCircle,
  GetApp,
  FilterList,
  MoreVert,
  PictureAsPdf,
  TableChart,
  History,
  Search,
  Timer,
} from "@mui/icons-material";
import { SuiDatePicker } from "@safaricom/sui";
import dayjs, { Dayjs } from "dayjs";

const dealers = [
  { id: "DL-88421", name: "Nairobi Central Distributors", region: "Nairobi", pct: 92, status: "Submitted", late: false, trend: "up" },
  { id: "DL-77210", name: "Rift Valley Wholesale", region: "Rift Valley", pct: 61, status: "In Progress", late: false, trend: "down" },
  { id: "DL-66541", name: "Coastline Telecom Ltd", region: "Coast", pct: 0, status: "Not Started", late: true, trend: "down" },
  { id: "DL-55432", name: "Lake Region Partners", region: "Nyanza", pct: 88, status: "Submitted", late: false, trend: "up" },
  { id: "DL-44321", name: "Western Connect", region: "Western", pct: 15, status: "In Progress", late: true, trend: "up" },
];

const auditLogs = [
  { id: "TX-100234", date: "2024-03-25 14:22", dealer: "DL-88421", action: "Submission", ref: "REF-99281", status: "Success" },
  { id: "TX-100235", date: "2024-03-25 15:45", dealer: "DL-55432", action: "IPRS Validate", ref: "ID-12882", status: "Success" },
  { id: "TX-100236", date: "2024-03-26 09:12", dealer: "DL-66541", action: "Validation Fail", ref: "REF-00000", status: "Failed" },
];

export default function MonitoringPage() {
  const [reportView, setReportView] = useState(false);

  return (
    <Container maxWidth="xl">
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, alignItems: "flex-end" }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Button variant="outlined" startIcon={<History />}>Audit Trail</Button>
            <Button variant="contained" startIcon={<GetApp />} onClick={() => setReportView(!reportView)}>
              {reportView ? "Back to Dashboard" : "Generate Reports"}
            </Button>
          </Stack>
        </Box>

        {reportView ? (
          <Grid container spacing={3} className="animate-fadeInUp">
            {/* Report Filters */}
            <Grid item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 4, borderRadius: 5 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>Report Configuration</Typography>
                <Divider sx={{ mb: 3 }} />
                <Stack spacing={3}>
                  <TextField select fullWidth label="Dealer Selector" defaultValue="All">
                    <MenuItem value="All">All Dealers</MenuItem>
                    {dealers.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
                  </TextField>
                  <TextField select fullWidth label="Region Selector" defaultValue="All">
                    <MenuItem value="All">All Regions</MenuItem>
                    <MenuItem value="Nairobi">Nairobi</MenuItem>
                    <MenuItem value="Coast">Coast</MenuItem>
                  </TextField>
                  <SuiDatePicker label="Start Date" defaultValue={dayjs("2024-03-01")} format="DD/MM/YYYY" onChange={() => {}} slotProps={{ textField: { fullWidth: true } }} />
                  <SuiDatePicker label="End Date" defaultValue={dayjs("2024-03-31")} format="DD/MM/YYYY" onChange={() => {}} slotProps={{ textField: { fullWidth: true } }} />
                  
                  <Box sx={{ pt: 2 }}>
                    <Typography variant="subtitle2" fontWeight={700} gutterBottom>Export Format</Typography>
                    <Stack direction="row" spacing={2}>
                      <Button fullWidth variant="contained" color="primary" startIcon={<PictureAsPdf />}>Export PDF</Button>
                      <Button fullWidth variant="contained" color="success" startIcon={<TableChart />}>Export Excel</Button>
                    </Stack>
                  </Box>
                  <Button variant="outlined" size="large" sx={{ py: 1.5, fontWeight: 700 }}>Preview Data</Button>
                </Stack>
              </Paper>
            </Grid>

            {/* Report Preview Pane */}
            <Grid item xs={12} md={8}>
              <Paper variant="outlined" sx={{ p: 4, borderRadius: 5, minHeight: 600, bgcolor: "#525659", display: "flex", justifyContent: "center", position: "relative" }}>
                <Box sx={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 1 }}>
                  <IconButton sx={{ bgcolor: "white", "&:hover": { bgcolor: "#eee" } }}><PictureAsPdf /></IconButton>
                  <IconButton sx={{ bgcolor: "white", "&:hover": { bgcolor: "#eee" } }}><TableChart /></IconButton>
                </Box>
                <Paper sx={{ width: "100%", maxWidth: 600, p: 6, bgcolor: "white", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 8 }}>
                    <Box>
                      <Typography variant="h6" fontWeight={600} color="primary">Safaricom PLC</Typography>
                      <Typography variant="caption" color="text.secondary">SIM Distribution Returns Compliance Report</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight={600}>MAR 2026</Typography>
                  </Box>

                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>Executive Summary</Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body2" paragraph color="text.secondary">
                    Overall compliance rate for the period March 2026 reached 74.2%, representing an 8% increase from February.
                    Total returns processed: 4,120. Exceptions noted: 12.
                  </Typography>

                  <Box sx={{ my: 4, p: 3, bgcolor: "#F8F9FA", borderRadius: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600}>Compliance by Region</Typography>
                    <Stack spacing={1} sx={{ mt: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}><Typography variant="caption">Nairobi</Typography><Typography variant="caption" fontWeight={700}>92%</Typography></Box>
                      <LinearProgress variant="determinate" value={92} color="success" />
                      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}><Typography variant="caption">Rift Valley</Typography><Typography variant="caption" fontWeight={700}>61%</Typography></Box>
                      <LinearProgress variant="determinate" value={61} color="warning" />
                    </Stack>
                  </Box>
                  
                  <Typography variant="caption" color="text.disabled" sx={{ mt: 10, display: "block", textAlign: "center" }}>--- Internal Confidential Document ---</Typography>
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        ) : (
          <>
            {/* KPI Section with Deadline Timer */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <Card className="premium-card" sx={{ borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: "uppercase" }}>
                      Overall Compliance
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                      <Typography variant="h4" fontWeight={700}>74.2%</Typography>
                      <TrendingUp color="success" />
                    </Stack>
                    <Typography variant="caption" color="success.main" fontWeight={600}>+4.1% from last month</Typography>
                    <LinearProgress variant="determinate" value={74.2} sx={{ mt: 1.5, height: 6, borderRadius: 2 }} color="success" />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className="premium-card" sx={{ borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                      Pending Deadline
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                      <Typography variant="h4" fontWeight={700} color="warning.main">09 Days</Typography>
                      <Timer color="warning" />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">Remaining until 5th April cutoff</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className="premium-card" sx={{ borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                      Active Exceptions
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                      <Typography variant="h4" fontWeight={700} color="error">12</Typography>
                      <TrendingDown color="error" />
                    </Stack>
                    <Typography variant="caption" color="error.main" fontWeight={700}>-2 since yesterday</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card className="premium-card" sx={{ borderRadius: 4 }}>
                  <CardContent>
                    <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: "uppercase" }}>
                      Auto-Validation
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
                      <Typography variant="h4" fontWeight={700}>98.4%</Typography>
                      <CheckCircle color="primary" />
                    </Stack>
                    <Typography variant="caption" color="text.secondary">Real-time SIM Allocation success</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Main Monitoring Table */}
            <Card variant="outlined" sx={{ borderRadius: 4 }}>
              <Box sx={{ p: 3, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={600}>Dealer Submission Status</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField size="small" placeholder="Search Dealer..." InputProps={{ startAdornment: <Search fontSize="small" sx={{ mr: 1 }} /> }} />
                  <IconButton size="small"><FilterList /></IconButton>
                </Stack>
              </Box>
              <TableContainer sx={{ overflowX: "auto" }}>
                <Table sx={{ minWidth: 800 }}>
                  <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Dealer Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Region</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Trend</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Completion</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dealers.map((d) => (
                      <TableRow key={d.id} hover>
                        <TableCell>
                          <Typography variant="subtitle2" fontWeight={700}>{d.name}</Typography>
                          <Typography variant="caption" color="text.secondary">{d.id}</Typography>
                        </TableCell>
                        <TableCell>{d.region}</TableCell>
                        <TableCell>
                          {d.trend === "up" ? <TrendingUp color="success" fontSize="small" /> : <TrendingDown color="error" fontSize="small" />}
                        </TableCell>
                        <TableCell sx={{ width: 200 }}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{ flex: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={d.pct} 
                                sx={{ height: 8, borderRadius: 4 }}
                                color={d.pct > 80 ? "success" : d.pct > 30 ? "warning" : "error"}
                              />
                            </Box>
                            <Typography variant="caption" fontWeight={700}>{d.pct}%</Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="small" 
                            label={d.status} 
                            sx={{ fontWeight: 700, borderRadius: 1 }}
                            color={d.status === "Submitted" ? "success" : d.status === "In Progress" ? "warning" : "default"}
                            variant={d.status === "Submitted" ? "filled" : "outlined"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button size="small">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>

            {/* Analysis Section with Late Submission Graph */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>Historical Compliance</Typography>
                  <Box sx={{ height: 180, display: "flex", alignItems: "flex-end", gap: 2, pt: 4 }}>
                    {[45, 52, 68, 65, 74, 84].map((h, i) => (
                      <Box key={i} sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                        <Box sx={{ width: "100%", height: `${h}%`, bgcolor: i === 5 ? "primary.main" : "divider", borderRadius: "4px 4px 0 0" }} />
                        <Typography variant="caption" sx={{ fontSize: "0.6rem" }}>{["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i]}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>Late Submissions Trend</Typography>
                  <Box sx={{ height: 180, p: 2 }}>
                    {/* SVG Line chart simulation */}
                    <svg width="100%" height="100%" viewBox="0 0 400 100" preserveAspectRatio="none">
                      <path d="M0,80 L80,60 L160,90 L240,40 L320,50 L400,20" fill="none" stroke="#eb1923" strokeWidth="3" />
                      <circle cx="0" cy="80" r="4" fill="#eb1923" />
                      <circle cx="80" cy="60" r="4" fill="#eb1923" />
                      <circle cx="160" cy="90" r="4" fill="#eb1923" />
                      <circle cx="240" cy="40" r="4" fill="#eb1923" />
                      <circle cx="320" cy="50" r="4" fill="#eb1923" />
                      <circle cx="400" cy="20" r="4" fill="#eb1923" />
                    </svg>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                      {["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"].map(m => (
                        <Typography key={m} variant="caption" sx={{ fontSize: "0.6rem" }}>{m}</Typography>
                      ))}
                    </Box>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Audit Log Section */}
            <Card variant="outlined" sx={{ borderRadius: 4 }}>
              <Box sx={{ p: 3, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={600}>Recent Audit Logs</Typography>
                <Button size="small" startIcon={<GetApp />}>Export Log</Button>
              </Box>
              <TableContainer>
                <Table size="small">
                  <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Timestamp</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Dealer ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Action</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Reference</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {auditLogs.map((log) => (
                      <TableRow key={log.id} hover>
                        <TableCell><Typography variant="caption">{log.date}</Typography></TableCell>
                        <TableCell><Typography variant="caption" fontWeight={700}>{log.dealer}</Typography></TableCell>
                        <TableCell><Typography variant="caption">{log.action}</Typography></TableCell>
                        <TableCell><Typography variant="caption" color="primary">{log.ref}</Typography></TableCell>
                        <TableCell>
                          <Chip label={log.status} size="small" sx={{ fontSize: "0.65rem", height: 20, fontWeight: 600 }} color={log.status === "Success" ? "success" : "error"} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </>
        )}
      </Stack>
    </Container>
  );
}
