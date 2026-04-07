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
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Gavel,
  History,
  Search,
  Fingerprint,
  AdminPanelSettings,
  Shield,
} from "@mui/icons-material";

const MOCK_AUDIT_LOGS = [
  { id: "LOG-01021", user: "John Smith", action: "SIM Return Submission", target: "RET-2024-001", time: "2024-04-01 10:30:45", outcome: "Success", ip: "192.168.1.45" },
  { id: "LOG-01025", user: "John Smith", action: "Bulk Serial Validation", target: "B-2024-001", time: "2024-04-03 14:15:22", outcome: "Partial Failure", ip: "192.168.1.45" },
  { id: "LOG-01028", user: "Alice Admin", action: "User Credentials Updated", target: "Dealer #JS-001", time: "2024-04-04 11:20:10", outcome: "Success", ip: "10.0.0.8" },
  { id: "LOG-01032", user: "John Smith", action: "Export Performance Data", target: "Reports/Monthly", time: "2024-04-05 09:00:15", outcome: "Success", ip: "192.168.1.45" },
];

const MOCK_API_LOGS = [
  { id: "API-00123", service: "IPRS Integration", endpoint: "/iprs/validate-id", time: "2024-04-05 10:12:05", status: "200 OK", latency: "140ms", payloadRef: "REQ-74892" },
  { id: "API-00124", service: "Subreg Mapping", endpoint: "/subreg/cluster", time: "2024-04-05 10:15:11", status: "200 OK", latency: "85ms", payloadRef: "REQ-74893" },
  { id: "API-00125", service: "SMS Gateway", endpoint: "/sms/send", time: "2024-04-05 10:20:33", status: "500 Error", latency: "3100ms", payloadRef: "REQ-74898" },
  { id: "API-00126", service: "SIM Returns ms", endpoint: "/dealer-serial-return", time: "2024-04-05 10:21:00", status: "200 OK", latency: "215ms", payloadRef: "REQ-74900" },
];

import { DataTable } from "@/components/DataTable";
import { useState } from "react";

export default function AuditPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterOutcome, setFilterOutcome] = useState("");

  const filteredLogs = MOCK_AUDIT_LOGS.filter(log => {
    const q = searchQuery.toLowerCase();
    const matchSearch = log.user.toLowerCase().includes(q) || log.action.toLowerCase().includes(q) || log.target.toLowerCase().includes(q) || log.id.toLowerCase().includes(q);
    const matchOutcome = filterOutcome ? log.outcome === filterOutcome : true;
    return matchSearch && matchOutcome;
  });

  const filteredApiLogs = MOCK_API_LOGS.filter(log => {
    const q = searchQuery.toLowerCase();
    const matchSearch = log.service.toLowerCase().includes(q) || log.endpoint.toLowerCase().includes(q) || log.id.toLowerCase().includes(q);
    const matchOutcome = filterOutcome ? log.status.includes(filterOutcome === "Success" ? "200" : "500") : true;
    return matchSearch && matchOutcome;
  });
  const columns = [
    { id: "id", label: "Audit ID", format: (val: string) => <Typography variant="caption" fontWeight={600} color="text.disabled">{val}</Typography> },
    { id: "user", label: "User / Actor", format: (val: string) => (
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar sx={{ width: 24, height: 24, fontSize: "0.7rem", bgcolor: val.includes("Admin") ? "primary.main" : "var(--safaricom-green)" }}>
          {val.split(" ").map(n => n[0]).join("")}
        </Avatar>
        <Typography variant="body2" fontWeight={600}>{val}</Typography>
      </Stack>
    )},
    { id: "action", label: "Action Performed", format: (val: string) => <Typography variant="body2" fontWeight={500}>{val}</Typography> },
    { id: "target", label: "Target Entity", format: (val: string) => <Typography variant="body2" color="primary" sx={{ fontFamily: "monospace" }}>{val}</Typography> },
    { id: "time", label: "Timestamp", format: (val: string) => <Typography variant="caption" color="text.secondary">{val}</Typography> },
    { id: "outcome", label: "Outcome", format: (val: string) => (
      <Chip
        label={val}
        size="small"
        color={val === "Success" ? "success" : "error"}
        variant="outlined"
        sx={{ fontWeight: 600, fontSize: "0.65rem", height: 18 }}
      />
    )},
    { id: "ip", label: "Trace Vector", align: "right" as const, format: (val: string) => <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.disabled" }}>{val}</Typography> },
  ];

  const apiColumns = [
    { id: "id", label: "Trace ID", format: (val: string) => <Typography variant="caption" fontWeight={600} color="text.disabled">{val}</Typography> },
    { id: "service", label: "Consumer Service", format: (val: string) => <Typography variant="body2" fontWeight={600}>{val}</Typography> },
    { id: "endpoint", label: "API Endpoint", format: (val: string) => <Typography variant="body2" sx={{ fontFamily: "monospace", color: "primary.main" }}>{val}</Typography> },
    { id: "time", label: "Timestamp", format: (val: string) => <Typography variant="caption" color="text.secondary">{val}</Typography> },
    { id: "latency", label: "Response Time", format: (val: string) => <Typography variant="body2" sx={{ fontFamily: "monospace" }}>{val}</Typography> },
    { id: "status", label: "HTTP Status", format: (val: string) => (
      <Chip
        label={val}
        size="small"
        color={val.includes("200") ? "success" : "error"}
        variant="outlined"
        sx={{ fontWeight: 600, fontSize: "0.65rem", height: 18 }}
      />
    )},
    { id: "payloadRef", label: "Payload Ref", align: "right" as const, format: (val: string) => <Button size="small" sx={{ fontWeight: 600, fontSize: "0.7rem", textTransform: "none" }}>{val}</Button> },
  ];

  return (
    <Container maxWidth={false} className="animate-fadeInUp" sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
          <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} sx={{ minHeight: 36, '& .MuiTab-root': { minHeight: 36, textTransform: "none", fontWeight: 600 } }}>
            <Tab label="System Logs" />
            <Tab label="API Integrations Logs" />
          </Tabs>
          <Stack direction="row" spacing={2}>
             <Chip
               icon={<Fingerprint sx={{ fontSize: 18 }} />}
               label="Immutable Ledger Active"
               color="success"
               size="small"
               sx={{ fontWeight: 600, borderRadius: 1.5 }}
             />
          </Stack>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
              <Stack direction="row" spacing={1}>
                <TextField
                  placeholder="Filter logs by user, action or ID..."
                  size="small"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ width: 450 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: "text.disabled", fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 1.5 }
                  }}
                />
                <Button
                  size="small"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  sx={{ fontWeight: 600, color: showAdvanced ? "var(--safaricom-green)" : "text.secondary", textTransform: "none" }}
                >
                  {showAdvanced ? "Hide Filters" : "Advanced"}
                </Button>
              </Stack>
              <Button
                variant="outlined"
                startIcon={<History />}
                size="small"
                sx={{ fontWeight: 600, borderRadius: 1.5 }}
              >
                Full History Log
              </Button>
            </Stack>
            
            {showAdvanced && (
              <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #eee" }}>
                <Stack direction="row" spacing={1.5}>
                  <TextField select size="small" label="Outcome" value={filterOutcome} onChange={(e) => setFilterOutcome(e.target.value)} sx={{ width: 160 }} SelectProps={{ native: true }}>
                     <option value=""></option>
                     <option value="Success">Success</option>
                     <option value="Partial Failure">Partial Failure</option>
                  </TextField>
                </Stack>
              </Box>
            )}
          </Box>
          <DataTable columns={activeTab === 0 ? columns : apiColumns} rows={activeTab === 0 ? filteredLogs : filteredApiLogs} />
        </Card>

        <Stack direction="row" spacing={2} sx={{ p: 2, bgcolor: "rgba(0,0,0,0.02)", borderRadius: 2 }}>
           <AdminPanelSettings sx={{ color: "primary.main" }} />
           <Typography variant="caption" color="text.secondary">
             Note: System logs are cryptographically hashed and cannot be altered once written. For forensic inquiries, contact Safaricom IT Audit.
           </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
