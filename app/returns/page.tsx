"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  MenuItem,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import {
  Search,
  AddCircle,
  LibraryAdd,
  TableChart,
  PictureAsPdf,
  FilterList,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useState } from "react";
import NextLink from "next/link";
import { DataTable } from "@/components/DataTable";
import { Collapse, Divider } from "@mui/material";
import { SuiDatePicker } from "@safaricom/sui";
import dayjs, { Dayjs } from "dayjs";

const MOCK_RETURNS = [
  { id: "RET-2024-001", serial: "894000000000123", date: "2024-04-01", reason: "Damaged", status: "Approved" },
  { id: "RET-2024-002", serial: "894000000000456", date: "2024-04-02", reason: "Expired", status: "Pending" },
  { id: "RET-2024-003", serial: "894000000000789", date: "2024-04-03", reason: "Defective", status: "Processed" },
  { id: "RET-2024-004", serial: "894000000000999", date: "2024-04-05", reason: "Customer Return", status: "In Review" },
];

export default function SimReturnsPage() {
  const [openSingle, setOpenSingle] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterFromDate, setFilterFromDate] = useState<Dayjs | null>(null);
  const [filterToDate, setFilterToDate] = useState<Dayjs | null>(null);
  const [filterReason, setFilterReason] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleSubmitReturn = () => {
    setOpenSingle(false);
    setSnackbarMessage("Return successfully submitted!");
    setSnackbarSeverity("success");
  };

  const filteredReturns = MOCK_RETURNS.filter(ret => {
    const q = searchQuery.toLowerCase();
    const matchSearch = ret.serial.toLowerCase().includes(q) || ret.id.toLowerCase().includes(q);
    const matchStatus = filterStatus ? ret.status === filterStatus : true;
    const matchReason = filterReason ? ret.reason === filterReason : true;
    const matchFrom = filterFromDate ? ret.date >= filterFromDate.format("YYYY-MM-DD") : true;
    const matchTo = filterToDate ? ret.date <= filterToDate.format("YYYY-MM-DD") : true;
    return matchSearch && matchStatus && matchReason && matchFrom && matchTo;
  });

  const columns = [
    { id: "id", label: "Return ID", format: (val: string) => <Typography variant="body2" fontWeight={500} color="primary">{val}</Typography> },
    { id: "serial", label: "SIM Serial", format: (val: string) => <Typography variant="body2" fontWeight={500}>{val}</Typography> },
    { id: "date", label: "Return Date" },
    { id: "reason", label: "Reason" },
    { id: "status", label: "Status", format: (val: string) => (
      <Chip
        label={val}
        size="small"
        color={val === "Approved" ? "success" : val === "Pending" ? "warning" : "primary"}
        variant="outlined"
        sx={{ fontWeight: 500, fontSize: "0.7rem", height: 20 }}
      />
    )},
    { id: "actions", label: "Actions", align: "right" as const, format: () => <Button size="small" sx={{ fontWeight: 500 }}>Details</Button> },
  ];

  return (
    <Container maxWidth={false} className="animate-fadeInUp" sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.5 }}>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<TableChart />} size="small" sx={{ borderRadius: 1.5, fontWeight: 600 }}>Export Excel</Button>
            <Button variant="outlined" startIcon={<PictureAsPdf />} size="small" sx={{ borderRadius: 1.5, fontWeight: 600 }}>Export PDF</Button>
          </Stack>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  placeholder="Search serial or reference..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: 280 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "text.disabled", fontSize: 18 }} />
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
              <Stack direction="row" spacing={1}>
                <Button onClick={() => setOpenSingle(true)} variant="contained" startIcon={<AddCircle />} size="small" sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600, borderRadius: 1.5, textTransform: "none" }}>Single Return</Button>
                <Button component={NextLink} href="/returns/batch" variant="outlined" startIcon={<LibraryAdd />} size="small" sx={{ fontWeight: 600, borderRadius: 1.5, textTransform: "none" }}>Batch</Button>
              </Stack>
            </Stack>
            <Collapse in={showAdvanced}>
              <Divider sx={{ my: 1.5 }} />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap">
                <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ width: 160 }}>
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Processed">Processed</MenuItem>
                  <MenuItem value="In Review">In Review</MenuItem>
                </TextField>
                <TextField select size="small" label="Reason" value={filterReason} onChange={(e) => setFilterReason(e.target.value)} sx={{ width: 180 }}>
                  <MenuItem value="">All Reasons</MenuItem>
                  <MenuItem value="Damaged">Damaged</MenuItem>
                  <MenuItem value="Expired">Expired</MenuItem>
                  <MenuItem value="Defective">Defective</MenuItem>
                  <MenuItem value="Customer Return">Customer Return</MenuItem>
                </TextField>
                <SuiDatePicker label="From Date" value={filterFromDate} onChange={(v) => setFilterFromDate(v)} format="DD/MM/YYYY" slotProps={{ textField: { size: "small", sx: { width: 160 } } }} />
                <SuiDatePicker label="To Date" value={filterToDate} onChange={(v) => setFilterToDate(v)} format="DD/MM/YYYY" slotProps={{ textField: { size: "small", sx: { width: 160 } } }} />
                {(filterStatus || filterReason || filterFromDate || filterToDate) && (
                  <Button size="small" onClick={() => { setFilterStatus(""); setFilterReason(""); setFilterFromDate(null); setFilterToDate(null); }} sx={{ fontWeight: 600, color: "error.main", textTransform: "none" }}>Clear</Button>
                )}
              </Stack>
            </Collapse>
          </Box>
          <DataTable columns={columns} rows={filteredReturns} />
        </Card>

        {/* Single Return Dialog */}
        <Dialog open={openSingle} onClose={() => setOpenSingle(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 2 } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>New Single Return</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <TextField fullWidth label="Reseller ID" placeholder="e.g. RS-1001" size="small" />
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ whiteSpace: "nowrap", height: 40 }}
                >
                  Verify IPRS
                </Button>
              </Stack>
              <TextField fullWidth label="SIM Serial Number" placeholder="Enter single serial" size="small" />
              
              <TextField select fullWidth size="small" label="Serial Destination" defaultValue="Retail Shop">
                <MenuItem value="Retail Shop">Retail Shop</MenuItem>
                <MenuItem value="Dealer Outlet">Dealer Outlet</MenuItem>
                <MenuItem value="Head Office">Head Office</MenuItem>
              </TextField>

              <TextField select fullWidth size="small" label="Location (Cluster)" defaultValue="Nairobi">
                <MenuItem value="Nairobi">Nairobi</MenuItem>
                <MenuItem value="Rift Valley">Rift Valley</MenuItem>
                <MenuItem value="Coast">Coast</MenuItem>
              </TextField>

              <TextField fullWidth select label="Reason" defaultValue="Damaged" size="small">
                <MenuItem value="Damaged">Damaged</MenuItem>
                <MenuItem value="Expired">Expired</MenuItem>
                <MenuItem value="Defective">Defective</MenuItem>
                <MenuItem value="Customer Return">Customer Return</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setOpenSingle(false)} sx={{ fontWeight: 600 }}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmitReturn} sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600 }}>Submit</Button>
          </DialogActions>
        </Dialog>

        {/* Global Snackbar */}
        <Snackbar
          open={!!snackbarMessage}
          autoHideDuration={4000}
          onClose={() => setSnackbarMessage("")}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MuiAlert onClose={() => setSnackbarMessage("")} severity={snackbarSeverity} sx={{ width: "100%", fontWeight: 600 }} variant="filled">
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>

      </Stack>
    </Container>
  );
}
