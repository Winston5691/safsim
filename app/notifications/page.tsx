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
  Chip,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import {
  Search,
  Sms,
  Email,
  TableChart,
  PictureAsPdf,
  Schedule,
} from "@mui/icons-material";
import { useState } from "react";
import { MOCK_SMS, MOCK_EMAILS } from "@/lib/mockData";

export default function NotificationsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const currentData = tabValue === 0 ? MOCK_SMS : MOCK_EMAILS;
  const filteredData = currentData.filter((item: any) => 
    item.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.message && item.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.subject && item.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="xl" className="animate-fadeInUp">
      <Stack spacing={2}>
        <Box sx={{ 
          display: "flex", 
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between", 
          alignItems: { xs: "stretch", md: "center" },
          gap: 2,
          mb: 1
        }}>
          <Tabs 
            value={tabValue} 
            onChange={(_, v) => setTabValue(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTab-root": { textTransform: "none", fontWeight: 600, fontSize: "0.95rem" },
              "& .Mui-selected": { color: "var(--safaricom-green) !important" },
              "& .MuiTabs-indicator": { bgcolor: "var(--safaricom-green)" }
            }}
          >
            <Tab icon={<Sms fontSize="small" />} iconPosition="start" label="SMS Messages" />
            <Tab icon={<Email fontSize="small" />} iconPosition="start" label="Emails" />
          </Tabs>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="outlined" startIcon={<TableChart />} sx={{ fontWeight: 600, borderRadius: 2 }}>Export Excel</Button>
            <Button variant="outlined" startIcon={<PictureAsPdf />} sx={{ fontWeight: 600, borderRadius: 2 }}>Export PDF</Button>
          </Stack>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <Box sx={{ p: 3, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} justifyContent="space-between" alignItems={ { xs: "stretch", md: "center" } }>
              <TextField
                placeholder={tabValue === 0 ? "Search by phone number..." : "Search by email or subject..."}
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: { xs: "100%", md: 400 } }}
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
                variant="contained"
                startIcon={<Search />}
                sx={{ bgcolor: "var(--safaricom-green)", "&:hover": { bgcolor: "#157a26" }, fontWeight: 600, borderRadius: 2 }}
              >
                Search
              </Button>
            </Stack>
          </Box>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 800 }}>
              <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Recipient</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{tabValue === 0 ? "Message Preview" : "Subject"}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Timestamp</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item: any) => (
                  <TableRow key={item.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">{item.id}</Typography></TableCell>
                    <TableCell><Typography variant="body2" fontWeight={600}>{item.recipient}</Typography></TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {tabValue === 0 ? (item as any).message : (item as any).subject}
                      </Typography>
                    </TableCell>
                    <TableCell>
                       <Stack direction="row" spacing={1} alignItems="center">
                         <Schedule sx={{ fontSize: 14, color: "text.disabled" }} />
                         <Typography variant="caption">{item.date}</Typography>
                       </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        size="small"
                        color={item.status === "Delivered" || item.status === "Opened" ? "success" : "primary"}
                        variant="outlined"
                        sx={{ fontWeight: 600, fontSize: "0.7rem" }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" sx={{ fontWeight: 600 }}>View</Button>
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
