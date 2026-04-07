"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  TextField,
  MenuItem,
  Divider,
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
  Collapse,
} from "@mui/material";
import { AddShoppingCart, LocalShipping, Add, Search, FilterList, ExpandLess, ExpandMore } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { SuiDatePicker } from "@safaricom/sui";
import dayjs, { Dayjs } from "dayjs";

export default function OrderingPage() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterDate, setFilterDate] = useState<Dayjs | null>(null);

  const [orders, setOrders] = useState([
    { id: "ORD-99281", type: "Prepaid SIM (4G/5G)", qty: 500, location: "Nairobi", status: "In Transit", date: "2024-03-25" },
    { id: "ORD-99282", type: "Prepaid SIM (4G/5G)", qty: 250, location: "Mombasa", status: "Delivered", date: "2024-03-20" },
  ]);

  const filteredOrders = orders.filter(o => {
    const q = searchQuery.toLowerCase();
    const matchSearch = o.id.toLowerCase().includes(q) || o.type.toLowerCase().includes(q);
    const matchStatus = filterStatus ? o.status === filterStatus : true;
    const matchLocation = filterLocation ? o.location.toLowerCase().includes(filterLocation.toLowerCase()) : true;
    const matchDate = filterDate ? o.date === filterDate.format("YYYY-MM-DD") : true;
    return matchSearch && matchStatus && matchLocation && matchDate;
  });

  const handleAddOrder = () => {
    setOpen(false);
    // Simulate add
  };

  return (
    <Container maxWidth="xl" className="animate-fadeInUp">
      <Stack spacing={2}>
        <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff", borderRadius: 0, mb: -2, zIndex: 1, position: "relative" }}>
          <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TextField
                placeholder="Search orders..."
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: 300 }}
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
            <Button variant="contained" startIcon={<Add />} onClick={() => setOpen(true)} size="small" sx={{ fontWeight: 600, borderRadius: 1.5, bgcolor: "var(--safaricom-green)", textTransform: "none" }}>New SIM Order</Button>
          </Stack>

          <Collapse in={showAdvanced}>
            <Divider sx={{ my: 1.5 }} />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} flexWrap="wrap">
              <TextField select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} sx={{ width: 160 }} SelectProps={{ native: true }}>
                <option value=""></option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
              </TextField>
              <TextField size="small" label="Location" value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} sx={{ width: 220 }} placeholder="e.g. Nairobi" />
              <SuiDatePicker label="Order Date" value={filterDate} onChange={(v) => setFilterDate(v)} format="DD/MM/YYYY" slotProps={{ textField: { size: "small", sx: { width: 160 } } }} />
              {(filterStatus || filterLocation || filterDate) && (
                <Button size="small" onClick={() => { setFilterStatus(""); setFilterLocation(""); setFilterDate(null); }} sx={{ fontWeight: 600, color: "error.main", textTransform: "none" }}>Clear</Button>
              )}
            </Stack>
          </Collapse>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Product Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Destination</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Order Date</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600}>{row.id}</Typography></TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Chip 
                        label={row.status} 
                        size="small" 
                        color={row.status === "Delivered" ? "success" : "warning"} 
                        sx={{ fontWeight: 600 }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small">Track</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* New Order Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Place New SIM Order</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField select fullWidth label="Product Type" defaultValue="prepaid">
                <MenuItem value="prepaid">Prepaid SIM (4G/5G)</MenuItem>
                <MenuItem value="postpaid">Postpaid SIM</MenuItem>
                <MenuItem value="replacement">SIM Replacement Kit</MenuItem>
              </TextField>
              <TextField fullWidth label="Quantity" type="number" defaultValue={100} />
              <TextField select fullWidth label="Delivery Location" defaultValue="nrb">
                <MenuItem value="nrb">Nairobi Central Warehouse</MenuItem>
                <MenuItem value="mbs">Mombasa Regional Hub</MenuItem>
              </TextField>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit" sx={{ fontWeight: 600 }}>Cancel</Button>
            <Button variant="contained" onClick={handleAddOrder} sx={{ fontWeight: 600, px: 4, bgcolor: "var(--safaricom-green)" }}>Confirm Order</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
