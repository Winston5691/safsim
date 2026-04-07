"use client";

import {
  Box,
  Card,
  Container,
  Paper,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  GetApp,
  Visibility,
  FilterList,
  CheckCircle,
} from "@mui/icons-material";

const MOCK_HISTORY = [
  { ref: "SR-992831", date: "2026-03-28", count: 50, reseller: "QuickTel Agents", status: "Submitted" },
  { ref: "SR-991204", date: "2026-03-15", count: 120, reseller: "M-Pesa Shop", status: "Submitted" },
  { ref: "SR-988273", date: "2026-03-02", count: 85, reseller: "Connect Hub", status: "Submitted" },
  { ref: "SR-975541", date: "2026-02-25", count: 200, reseller: "QuickTel Agents", status: "Compliant" },
  { ref: "SR-964421", date: "2026-02-10", count: 45, reseller: "M-Pesa Shop", status: "Compliant" },
];

import { DataTable } from "@/components/DataTable";
import { useState } from "react";

export default function ReturnHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");

  const filteredHistory = MOCK_HISTORY.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchSearch = item.ref.toLowerCase().includes(q) || item.reseller.toLowerCase().includes(q);
    const matchStatus = filterStatus ? item.status === filterStatus : true;
    return matchSearch && matchStatus;
  });
  const columns = [
    { id: "ref", label: "Reference", format: (val: string) => <Typography variant="body2" fontWeight={600} sx={{ fontFamily: "monospace" }}>{val}</Typography> },
    { id: "date", label: "Submission Date" },
    { id: "reseller", label: "Reseller" },
    { id: "count", label: "SIM Count", format: (val: number) => <Typography variant="body2">{val} SIMs</Typography> },
    { id: "status", label: "Status", format: (val: string) => (
      <Chip 
        size="small" 
        label={val} 
        color={val === "Compliant" ? "success" : "primary"}
        sx={{ fontWeight: 600, borderRadius: 1, height: 20, fontSize: "0.7rem" }}
      />
    )},
    { id: "actions", label: "Actions", align: "right" as const, format: () => (
      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
        <IconButton size="small" color="primary"><Visibility fontSize="small" /></IconButton>
        <IconButton size="small"><GetApp fontSize="small" /></IconButton>
      </Stack>
    )},
  ];

  return (
    <Container maxWidth={false} className="animate-fadeInUp" sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.5 }}>
          <Button variant="outlined" startIcon={<GetApp />} size="small" sx={{ fontWeight: 600, borderRadius: 1.5 }}>
            Export History
          </Button>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder="Search by Reference, Reseller or Serial..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 1.5 }
                  }}
                  sx={{ width: 400 }}
                />
                <Button 
                  onClick={() => setShowAdvanced(!showAdvanced)} 
                  variant={showAdvanced ? "contained" : "outlined"} 
                  startIcon={<FilterList />} 
                  size="small" 
                  sx={{ fontWeight: 600, borderRadius: 1.5, color: showAdvanced ? "white" : "var(--safaricom-green)" }}
                >
                  Filter
                </Button>
              </Stack>
            </Stack>
            
            {showAdvanced && (
              <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #eee" }}>
                <Stack direction="row" spacing={1.5}>
                  <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ width: 160 }} SelectProps={{ native: true }}>
                     <option value=""></option>
                     <option value="Submitted">Submitted</option>
                     <option value="Compliant">Compliant</option>
                  </TextField>
                </Stack>
              </Box>
            )}
          </Box>
          <DataTable columns={columns} rows={filteredHistory} />
        </Card>

        {/* Footer info */}
        <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderStyle: "dashed", display: "flex", alignItems: "center", gap: 2 }}>
          <CheckCircle color="success" />
          <Typography variant="body2" color="text.secondary">
            All records are stored in an immutable audit store for regulatory compliance.
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
}
