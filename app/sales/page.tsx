"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  TableRow,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Grid,
  IconButton,
} from "@mui/material";
import { TrendingUp, Visibility } from "@mui/icons-material";

import { DataTable } from "@/components/DataTable";

export default function SalesToolsPage() {
  const [selectedReseller, setSelectedReseller] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterTier, setFilterTier] = useState("");

  const rankings = [
    { id: "RS-1001", name: "QuickTel Agents", sales: "KES 142,000", growth: "+12%", status: "Platinum" },
    { id: "RS-2044", name: "M-Pesa Shop - Eastleigh", sales: "KES 98,500", growth: "+5%", status: "Gold" },
    { id: "RS-3312", name: "Connect Hub - Karen", sales: "KES 45,000", growth: "-2%", status: "Silver" },
  ];

  const filteredRankings = rankings.filter(r => {
    const q = searchQuery.toLowerCase();
    const matchSearch = r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
    const matchTier = filterTier ? r.status === filterTier : true;
    return matchSearch && matchTier;
  });

  const columns = [
    { id: "name", label: "Reseller Name", format: (val: string) => <Typography variant="body2" fontWeight={700}>{val}</Typography> },
    { id: "sales", label: "Monthly Sales" },
    { id: "growth", label: "Growth", format: (val: string) => <Typography variant="body2" color={val.startsWith("+") ? "success.main" : "error.main"} fontWeight={600}>{val}</Typography> },
    { id: "status", label: "Tier", format: (val: string) => <Chip label={val} size="small" variant="outlined" sx={{ fontWeight: 600, height: 20 }} /> },
    { id: "actions", label: "Details", align: "right" as const, format: (val: any, row: any) => (
      <IconButton size="small" onClick={() => setSelectedReseller(row)}><Visibility sx={{ fontSize: 20 }} /></IconButton>
    )},
  ];

  return (
    <Container maxWidth={false} className="animate-fadeInUp" sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
              <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TextField
                      placeholder="Search reseller name..."
                      size="small"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{ width: 280 }}
                      InputProps={{ sx: { borderRadius: 1.5, fontSize: "0.9rem" } }}
                    />
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => setShowAdvanced(!showAdvanced)}
                      sx={{ fontWeight: 600, color: showAdvanced ? "var(--safaricom-green)" : "text.secondary", textTransform: "none" }}
                    >
                      {showAdvanced ? "Hide Filters" : "Advanced"}
                    </Button>
                  </Stack>
                </Stack>
                
                {showAdvanced && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #eee" }}>
                    <Stack direction="row" spacing={1.5}>
                      <TextField select size="small" label="Tier" value={filterTier} onChange={(e) => setFilterTier(e.target.value)} sx={{ width: 160 }} SelectProps={{ native: true }}>
                        <option value=""></option>
                        <option value="Platinum">Platinum</option>
                        <option value="Gold">Gold</option>
                        <option value="Silver">Silver</option>
                      </TextField>
                    </Stack>
                  </Box>
                )}
              </Box>
              <DataTable columns={columns} rows={filteredRankings} />
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card variant="outlined" sx={{ borderRadius: 2, p: 3, bgcolor: "rgba(27, 147, 48, 0.05)", border: "none" }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Dealer Summary</Typography>
              <Typography variant="caption" color="text.secondary" display="block">Cumulative Commission</Typography>
              <Typography variant="h4" fontWeight={600} color="primary" sx={{ mb: 2 }}>KES 22,500</Typography>
              <LinearProgress variant="determinate" value={65} sx={{ height: 10, borderRadius: 5, mb: 1, bgcolor: "rgba(0,0,0,0.1)" }} />
              <Typography variant="caption" color="text.secondary">65% of monthly target achieved</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Details Dialog */}
        <Dialog open={!!selectedReseller} onClose={() => setSelectedReseller(null)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Performance Breakdown</DialogTitle>
          <DialogContent dividers>
            {selectedReseller && (
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="text.secondary">Reseller Name</Typography>
                  <Typography variant="body1" fontWeight={700}>{selectedReseller.name}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Total Sales</Typography>
                  <Typography variant="body1" fontWeight={700}>{selectedReseller.sales}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">Tier Status</Typography>
                  <Typography variant="body1" fontWeight={700} color="primary">{selectedReseller.status}</Typography>
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelectedReseller(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
