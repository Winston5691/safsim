"use client";

import { useState } from "react";
import {
  Box,
  Card,
  Container,
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
} from "@mui/material";
import { Search, Visibility, Description as DocIcon, VideoLibrary } from "@mui/icons-material";

export default function KnowledgePage() {
  const [selected, setSelected] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const materials = [
    { title: "5G SIM Onboarding Guide", type: "PDF", category: "Product Training", date: "2024-03-20" },
    { title: "SIM Return Portal Walkthrough", type: "Video", category: "System Guide", date: "2024-03-15" },
    { title: "CA Regulatory Compliance Update", type: "PDF", category: "Circular", date: "2024-03-10" },
  ];

  const filteredMaterials = materials.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth="xl" className="animate-fadeInUp">
      <Stack spacing={2}>

        <TextField
          fullWidth
          placeholder="Search materials by title or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          InputProps={{ 
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
            sx: { borderRadius: 1.5 }
          }}
          sx={{ bgcolor: "white", width: 450 }}
        />

        <Card variant="outlined" sx={{ borderRadius: 4 }}>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Resource Title</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Type</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Last Updated</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">View</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredMaterials.map((row) => (
                  <TableRow key={row.title} hover>
                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        {row.type === "Video" ? <VideoLibrary color="primary" /> : <DocIcon color="primary" />}
                        <Typography variant="body2" fontWeight={600}>{row.title}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => setSelected(row)}><Visibility /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4 } }}>
          <DialogTitle sx={{ fontWeight: 600 }}>Resource Information</DialogTitle>
          <DialogContent dividers>
            {selected && (
              <Stack spacing={2}>
                <Typography variant="h6" fontWeight={700}>{selected.title}</Typography>
                <Typography variant="body2" color="text.secondary">Category: {selected.category}</Typography>
                <Box sx={{ p: 4, bgcolor: "#eee", borderRadius: 2, textAlign: "center" }}>
                   {selected.type} Content Preview Simulation
                </Box>
              </Stack>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSelected(null)}>Close</Button>
            <Button variant="contained">Download</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Container>
  );
}
