"use client";
import NextLink from "next/link";
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
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Collapse,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import {
  Search,
  PersonAdd,
  VerifiedUser,
  LocationOn,
  TableChart,
  PictureAsPdf,
  FilterList,
  ExpandLess,
} from "@mui/icons-material";
import { useState } from "react";
import { MOCK_RESELLERS } from "@/lib/mockData";

import { DataTable } from "@/components/DataTable";

export default function ResellersPage() {
  const [openValidate, setOpenValidate] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleValidateSingle = () => {
    setOpenValidate(false);
    setSnackbarMessage("Reseller ID successfully validated!");
    setSnackbarSeverity("success");
  };

  const originalRows = MOCK_RESELLERS.map(r => ({
    ...r,
    location: r.name.split(" — ")[1] || "Nairobi"
  }));

  const filteredRows = originalRows.filter(r => {
    const q = searchQuery.toLowerCase();
    const matchSearch = r.name.toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
    const matchLoc = filterLocation ? r.location.toLowerCase().includes(filterLocation.toLowerCase()) : true;
    const matchStatus = filterStatus ? true : true; // Mock status is always Active
    return matchSearch && matchLoc && matchStatus;
  });

  const columns = [
    { id: "id", label: "Reseller ID", format: (val: string) => <Typography variant="body2" fontWeight={600} color="primary">{val}</Typography> },
    { id: "name", label: "Reseller Name" },
    { id: "nationalId", label: "National ID / KRA" },
    { id: "location", label: "Location", format: (val: string) => (
      <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <LocationOn sx={{ fontSize: 16, color: "text.disabled" }} />
        {val}
      </Typography>
    )},
    { id: "status", label: "Status", format: () => (
      <Chip
        label="Active"
        size="small"
        color="success"
        variant="outlined"
        sx={{ fontWeight: 600, fontSize: "0.7rem", height: 20 }}
      />
    )},
    { id: "actions", label: "Actions", align: "right" as const, format: () => <Button size="small" sx={{ fontWeight: 600 }}>View Details</Button> },
  ];

  // Remove the old rows definition as it's now filteredRows


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
                  placeholder="Search resellers by name or ID..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: 320 }}
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
                <Button variant="contained" startIcon={<VerifiedUser />} onClick={() => setOpenValidate(true)} size="small" sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600, borderRadius: 1.5, textTransform: "none" }}>Validate ID</Button>
                <Button component={NextLink} href="/resellers/batch" variant="outlined" startIcon={<PersonAdd />} size="small" sx={{ fontWeight: 600, borderRadius: 1.5, textTransform: "none" }}>Bulk Validation</Button>
              </Stack>
            </Stack>

            <Collapse in={showAdvanced}>
              <Divider sx={{ my: 1.5 }} />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap">
                <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ width: 160 }} SelectProps={{ native: true }}>
                  <option value=""></option>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </TextField>
                <TextField size="small" label="Location" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} sx={{ width: 220 }} placeholder="Filter by region (e.g. Nairobi)" />
                {(filterStatus || filterLocation) && (
                  <Button size="small" onClick={() => { setFilterStatus(""); setFilterLocation(""); }} sx={{ fontWeight: 600, color: "error.main", textTransform: "none" }}>Clear</Button>
                )}
              </Stack>
            </Collapse>
          </Box>
          <DataTable columns={columns} rows={filteredRows} />
        </Card>
      </Stack>

      {/* Filter Menu Removed */}
      {/* Validation Dialogs */}
      <Dialog open={openValidate} onClose={() => setOpenValidate(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 600 }}>Validate Reseller ID</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Verify a reseller's legal and dealership status using their ID.
          </Typography>
          <TextField fullWidth label="Reseller ID" placeholder="e.g. RS-1001" variant="outlined" />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenValidate(false)} sx={{ fontWeight: 600 }}>Cancel</Button>
          <Button variant="contained" onClick={handleValidateSingle} sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600 }}>VALIDATE ID</Button>
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
    </Container>
  );
}
