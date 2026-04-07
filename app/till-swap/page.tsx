"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Collapse,
  Divider,
} from "@mui/material";
import { Add, SwapHoriz, Search, FilterList, ExpandLess, ExpandMore } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

import { DataTable } from "@/components/DataTable";

export default function TillSwapPage() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterReason, setFilterReason] = useState("");

  const [swaps, setSwaps] = useState([
    { id: "SWP-102", from: "T-77281", to: "T-99211", reason: "Device Upgrade", status: "Completed", date: "2024-03-22" },
    { id: "SWP-101", from: "T-55412", to: "T-66712", reason: "Faulty Hardware", status: "Approved", date: "2024-03-24" },
  ]);

  const filteredSwaps = swaps.filter(s => {
    const q = searchQuery.toLowerCase();
    const matchSearch = s.id.toLowerCase().includes(q) || s.from.toLowerCase().includes(q) || s.to.toLowerCase().includes(q);
    const matchStatus = filterStatus ? s.status === filterStatus : true;
    const matchReason = filterReason ? s.reason.toLowerCase().includes(filterReason.toLowerCase()) : true;
    return matchSearch && matchStatus && matchReason;
  });

  const columns = [
    { id: "id", label: "Swap ID", format: (val: string) => <Typography variant="body2" fontWeight={600}>{val}</Typography> },
    { id: "from", label: "Source Till" },
    { id: "to", label: "Target Till" },
    { id: "reason", label: "Reason" },
    { id: "date", label: "Date" },
    { id: "status", label: "Status", format: (val: string) => <Chip label={val} size="small" color={val === "Completed" ? "success" : "info"} sx={{ fontWeight: 600, height: 20, fontSize: "0.7rem" }} /> },
    { id: "actions", label: "Action", align: "right" as const, format: () => <Button size="small" sx={{ fontWeight: 600 }}>Details</Button> },
  ];

  return (
    <Container maxWidth={false} className="animate-fadeInUp" sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff", borderRadius: 0, mb: -2, zIndex: 1, position: "relative" }}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                placeholder="Search Swap ID or Till..."
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
            <Button 
              variant="contained" 
              startIcon={<Add />} 
              onClick={() => setOpen(true)} 
              size="small"
              sx={{ fontWeight: 600, borderRadius: 1.5, bgcolor: "var(--safaricom-green)", textTransform: "none" }}
            >
              Request Till Swap
            </Button>
          </Stack>

          <Collapse in={showAdvanced}>
            <Divider sx={{ my: 1.5 }} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap">
              <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ width: 160 }} SelectProps={{ native: true }}>
                <option value=""></option>
                <option value="Completed">Completed</option>
                <option value="Approved">Approved</option>
              </TextField>
              <TextField size="small" label="Reason" value={filterReason} onChange={(e) => setFilterReason(e.target.value)} sx={{ width: 220 }} placeholder="Filter by reason" />
              {(filterStatus || filterReason) && (
                <Button size="small" onClick={() => { setFilterStatus(""); setFilterReason(""); }} sx={{ fontWeight: 600, color: "error.main", textTransform: "none" }}>Clear</Button>
              )}
            </Stack>
          </Collapse>
        </Box>

        <DataTable columns={columns} rows={filteredSwaps} />

        {/* Swap Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 2 } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>New Till Swap Request</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Alert severity="info" sx={{ borderRadius: 1.5 }}>Ensure both tills are inactive before requesting a swap.</Alert>
              <TextField fullWidth label="Source Till Number" placeholder="e.g. 77281" size="small" />
              <TextField fullWidth label="Target Till Number" placeholder="e.g. 99211" size="small" />
              <TextField fullWidth multiline rows={3} label="Justification for Swap" size="small" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpen(false)} sx={{ fontWeight: 600, px: 4, bgcolor: "var(--safaricom-green)" }}>Submit Request</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
