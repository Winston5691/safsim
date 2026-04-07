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
  TextField,
  Grid,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  BarChart,
  FilterList,
  TableChart,
  PictureAsPdf,
  Search,
} from "@mui/icons-material";
import { SuiDatePicker, InputField } from "@safaricom/sui";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { DataTable } from "@/components/DataTable";

export default function MonthlyReportsPage() {
  const [loading, setLoading] = useState(false);

  const columns = [
    { id: "period", label: "Period", format: (val: string) => <Typography variant="body2" fontWeight={700}>{val}</Typography> },
    { id: "alloc", label: "Total Allocations" },
    { id: "sales", label: "Total Sales" },
    { id: "rate", label: "Returns Rate" },
    { id: "comp", label: "Compliance Stat" },
    { id: "trend", label: "Trend", align: "right" as const, format: (val: string) => (
      <Typography variant="body2" sx={{ color: val.startsWith("+") ? "success.main" : "text.secondary", fontWeight: 700 }}>
        {val}
      </Typography>
    )},
  ];

  const MOCK_REPORT_DATA = [
    { period: "March 2024", alloc: "15,000", sales: "12,450", rate: "2.1%", comp: "98%", trend: "+5%" },
    { period: "February 2024", alloc: "12,000", sales: "10,200", rate: "1.8%", comp: "95%", trend: "+2%" },
    { period: "January 2024", alloc: "10,000", sales: "9,100", rate: "1.5%", comp: "99%", trend: "Stable" },
  ];

  return (
    <Container maxWidth={false} className="animate-fadeInUp" sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 0.5 }}>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" startIcon={<TableChart />} size="small" sx={{ borderRadius: 1.5, textTransform: "none", fontWeight: 600 }}>Export Excel</Button>
            <Button variant="outlined" startIcon={<PictureAsPdf />} size="small" sx={{ borderRadius: 1.5, textTransform: "none", fontWeight: 600 }}>Export PDF</Button>
          </Stack>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={3}>
               <SuiDatePicker 
                 label="Select Month" 
                 value={dayjs()} 
                 onChange={() => {}}
                 views={['month', 'year']}
                 format="MMMM YYYY"
                 slotProps={{ textField: { size: "small", fullWidth: true } }}
               />
            </Grid>
            <Grid item xs={12} md={3}>
               <TextField 
                 fullWidth 
                 label="Region" 
                 select 
                 variant="outlined" 
                 size="small" 
                 defaultValue="All"
                 sx={{ '& .MuiInputBase-root': { borderRadius: 1.5 } }}
               >
                 <MenuItem value="All">All Regions</MenuItem>
                 <MenuItem value="Nairobi">Nairobi</MenuItem>
                 <MenuItem value="Coast">Coast</MenuItem>
                 <MenuItem value="Rift">Rift Valley</MenuItem>
               </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
               <TextField 
                 fullWidth 
                 label="Metric" 
                 select 
                 variant="outlined" 
                 size="small" 
                 defaultValue="All"
                 sx={{ '& .MuiInputBase-root': { borderRadius: 1.5 } }}
               >
                 <MenuItem value="All">All Metrics</MenuItem>
                 <MenuItem value="Sales">Sales Volume</MenuItem>
                 <MenuItem value="Returns">Return Frequency</MenuItem>
                 <MenuItem value="Compliance">Compliance Score</MenuItem>
               </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
               <Button 
                 fullWidth 
                 variant="contained" 
                 startIcon={<Search />} 
                 size="small"
                 sx={{ 
                   bgcolor: "var(--safaricom-green)", 
                   height: 40, 
                   fontWeight: 700,
                   borderRadius: 1.5,
                   textTransform: "uppercase"
                 }}
               >
                 GENERATE
               </Button>
            </Grid>
          </Grid>
        </Card>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "#fff" }}>
            <Typography variant="subtitle1" fontWeight={700}>Report Data Table</Typography>
            <Button startIcon={<FilterList />} size="small" sx={{ textTransform: "none", fontWeight: 700 }}>Advanced Filters</Button>
          </Box>
          <DataTable columns={columns} rows={MOCK_REPORT_DATA} />
        </Card>
      </Stack>
    </Container>
  );
}
