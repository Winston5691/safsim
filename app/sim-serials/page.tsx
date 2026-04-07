"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  LinearProgress,
  Collapse,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Search,
  CheckCircle,
  FactCheck,
  FileDownload,
  PictureAsPdf,
  TableChart,
  FilterList,
  ExpandMore,
  ExpandLess,
  CloudUpload,
  ArrowForward,
  ArrowBack,
  Cancel,
  CheckCircleOutline,
  ErrorOutline,
} from "@mui/icons-material";
import { useState } from "react";
import NextLink from "next/link";
import { DataTable } from "@/components/DataTable";
import { Snackbar, Alert as MuiAlert } from "@mui/material";

const MOCK_SIMS = [
  { agentName: "ISTANZ KUTUS SHOP", mobigoNo: "0114692263", serial: "89254021274269654995", idNumber: "32407342", phoneNumber: "0797171484", vanShop: "SHOP", status: "Allocated" },
  { agentName: "ISTANZ KUTUS SHOP", mobigoNo: "011403908", serial: "89254021274269654797", idNumber: "25199014", phoneNumber: "0723074316", vanShop: "RIG", status: "In Stock" },
  { agentName: "DENNIS MWARIRI", mobigoNo: "", serial: "89254021334255432002", idNumber: "30726316", phoneNumber: "715055671", vanShop: "KIANYAGA SHO", status: "Allocated" },
  { agentName: "LAZARUS MUTHEE", mobigoNo: "", serial: "89254021334255436003", idNumber: "36686141", phoneNumber: "759136553", vanShop: "SHOP", status: "Sold" },
];

export default function SimSerialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterVan, setFilterVan] = useState("");
  const [filterAgent, setFilterAgent] = useState("");
  const [openValidate, setOpenValidate] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleValidateSingle = () => {
    setOpenValidate(false);
    setSnackbarMessage("SIM Serial successfully validated!");
    setSnackbarSeverity("success");
  };

  const filteredSims = MOCK_SIMS.filter(sim => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      sim.serial.toLowerCase().includes(q) ||
      sim.agentName.toLowerCase().includes(q) ||
      sim.idNumber.toLowerCase().includes(q) ||
      sim.mobigoNo.toLowerCase().includes(q);
    const matchesStatus = filterStatus ? sim.status === filterStatus : true;
    const matchesVan = filterVan ? sim.vanShop.toLowerCase().includes(filterVan.toLowerCase()) : true;
    const matchesAgent = filterAgent ? sim.agentName.toLowerCase().includes(filterAgent.toLowerCase()) : true;
    return matchesSearch && matchesStatus && matchesVan && matchesAgent;
  });

  const columns = [
    { id: "agentName", label: "Agent Name", format: (val: string) => <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>{val}</Typography> },
    { id: "mobigoNo", label: "Mobigo No", format: (val: string) => <Typography variant="body2" sx={{ fontSize: "0.85rem", color: "text.secondary" }}>{val || "—"}</Typography> },
    { id: "serial", label: "SIM Serial", format: (val: string) => <Typography variant="body2" sx={{ fontSize: "0.82rem", fontFamily: "monospace", color: "primary.main", fontWeight: 600 }}>{val}</Typography> },
    { id: "idNumber", label: "ID Number", format: (val: string) => <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>{val}</Typography> },
    { id: "phoneNumber", label: "Phone Number", format: (val: string) => <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>{val}</Typography> },
    { id: "vanShop", label: "Van/Shop", format: (val: string) => <Chip label={val} size="small" variant="outlined" sx={{ height: 20, fontSize: "0.7rem" }} /> },
    { id: "status", label: "Status", align: "right" as const, format: (val: string) => (
      <Chip
        label={val}
        size="small"
        color={val === "Allocated" ? "success" : val === "Sold" ? "primary" : "default"}
        sx={{ height: 20, fontSize: "0.7rem" }}
      />
    )},
  ];

  return (
    <Container maxWidth={false} className="animate-fadeInUp" sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        {/* Top Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
          <Stack direction="row" spacing={1}>
            {/* Batch Submission moved from here */}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<PictureAsPdf />} size="small" sx={{ borderRadius: 1.5, fontWeight: 600, textTransform: "none" }}>Export PDF</Button>
            <Button variant="outlined" startIcon={<TableChart />} size="small" sx={{ borderRadius: 1.5, fontWeight: 600, textTransform: "none" }}>Export Excel</Button>
          </Stack>
        </Box>

        {/* Main Table */}
        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
              <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                  placeholder="Search serial, agent, ID.."
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
                <Button
                  component={NextLink}
                  href="/sim-serials/batch"
                  variant="outlined"
                  startIcon={<FactCheck />}
                  size="small"
                  sx={{ fontWeight: 600, borderRadius: 1.5, textTransform: "none" }}
                >
                  Batch Submission
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckCircle />}
                  onClick={() => setOpenValidate(true)}
                  size="small"
                  sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600, borderRadius: 1.5, textTransform: "none", px: 2 }}
                >
                  Validate Single
                </Button>
              </Stack>
            </Stack>

            {/* Advanced Filters */}
            <Collapse in={showAdvanced}>
              <Divider sx={{ my: 1.5 }} />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap">
                <TextField
                  select
                  size="small"
                  label="Status"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  sx={{ width: 160 }}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value="Allocated">Allocated</MenuItem>
                  <MenuItem value="In Stock">In Stock</MenuItem>
                  <MenuItem value="Sold">Sold</MenuItem>
                </TextField>
                <TextField
                  size="small"
                  label="Van / Shop"
                  value={filterVan}
                  onChange={(e) => setFilterVan(e.target.value)}
                  sx={{ width: 160 }}
                  placeholder="e.g. SHOP"
                />
                <TextField
                  size="small"
                  label="Agent Name"
                  value={filterAgent}
                  onChange={(e) => setFilterAgent(e.target.value)}
                  sx={{ width: 220 }}
                  placeholder="Filter by agent"
                />
                {(filterStatus || filterVan || filterAgent) && (
                  <Button
                    size="small"
                    onClick={() => { setFilterStatus(""); setFilterVan(""); setFilterAgent(""); }}
                    sx={{ fontWeight: 600, color: "error.main", textTransform: "none" }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Stack>
            </Collapse>
          </Box>

          <DataTable columns={columns} rows={filteredSims} />
        </Card>

        {/* Single Validate Dialog */}
        <Dialog open={openValidate} onClose={() => setOpenValidate(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 2 } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Validate Single SIM Serial</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField fullWidth label="SIM Serial Number" placeholder="Enter single serial" size="small" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2, px: 3 }}>
            <Button onClick={() => setOpenValidate(false)} sx={{ fontWeight: 600 }}>Cancel</Button>
            <Button variant="contained" onClick={handleValidateSingle} sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600 }}>Validate</Button>
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
