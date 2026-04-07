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
  MenuItem,
} from "@mui/material";
import { Add, ConfirmationNumber, Search } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

export default function SupportPage() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets, setTickets] = useState([
    { id: "TKT-88221", subject: "SIM Activation Delay", priority: "High", status: "Open", date: "2024-04-01" },
    { id: "TKT-88210", subject: "M-Pesa Till Query", priority: "Medium", status: "Resolved", date: "2024-03-28" },
  ]);

  const filteredTickets = tickets.filter(t => 
    t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="xl" className="animate-fadeInUp">
      <Stack spacing={1}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TextField
            placeholder="Search tickets..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 20, color: "text.disabled" }} />
                </InputAdornment>
              ),
              sx: { borderRadius: 1.5 }
            }}
          />
          <Button 
            variant="contained" 
            fullWidth={{ xs: true, sm: false } as any}
            startIcon={<Add />} 
            onClick={() => setOpen(true)} 
            size="small"
            sx={{ fontWeight: 600, borderRadius: 1.5, bgcolor: "var(--safaricom-green)" }}
          >
            Open New Ticket
          </Button>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 4 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Ticket ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Subject</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Priority</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Date Created</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets.map((row) => (
                  <TableRow key={row.id} hover>
                    <TableCell><Typography variant="body2" fontWeight={600}>{row.id}</Typography></TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>
                      <Chip label={row.priority} size="small" variant="outlined" color={row.priority === "High" ? "error" : "default"} sx={{ fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <Chip label={row.status} size="small" color={row.status === "Resolved" ? "success" : "warning"} sx={{ fontWeight: 600 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" sx={{ fontWeight: 600 }}>View Thread</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        {/* New Ticket Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Create Support Ticket</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={3} sx={{ mt: 1 }}>
              <TextField fullWidth label="Issue Subject" placeholder="Brief description of the problem" />
              <TextField select fullWidth label="Category" defaultValue="technical">
                <MenuItem value="technical">Technical Support</MenuItem>
                <MenuItem value="commercial">Commercial / Commissions</MenuItem>
                <MenuItem value="inventory">Inventory / SIM Issues</MenuItem>
              </TextField>
              <TextField select fullWidth label="Priority" defaultValue="Medium">
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </TextField>
              <TextField fullWidth multiline rows={4} label="Detailed Message" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setOpen(false)} color="inherit" sx={{ fontWeight: 600 }}>Discard</Button>
            <Button variant="contained" onClick={() => setOpen(false)} sx={{ fontWeight: 600, px: 4, bgcolor: "var(--safaricom-green)" }}>Submit Ticket</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
