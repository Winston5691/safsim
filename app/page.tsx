"use client";

import React from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Typography,
  Grid,
  Card,
} from "@mui/material";
import {
  AddCircleOutline,
  History as HistoryIcon,
  InfoOutlined,
} from "@mui/icons-material";
import { StatusDonutChart, WeeklyBarChart } from "@/components/DashboardCharts";
import { DataTable } from "@/components/DataTable";

export default function Home() {
  const [activeMode, setActiveMode] = React.useState<"out" | "inbound">("out");

  const recentSerials = [
    { serial: "89254021274269654995", status: "Allocated", returns: "None" },
    { serial: "89254021274354213123", status: "Sold", returns: "In Review" },
    { serial: "89254021274269654797", status: "In Stock", returns: "Pending" },
  ];

  const serialColumns = [
    { id: "serial", label: "Serial", format: (val: string) => <Typography variant="body2" fontWeight={600} color="primary" sx={{ fontSize: "0.8rem" }}>{val}</Typography> },
    { id: "status", label: "Status", format: (val: string) => <Chip label={val} size="small" color={val === "Sold" ? "success" : "default"} sx={{ height: 18, fontSize: "0.65rem", fontWeight: 700 }} /> },
    { id: "returns", label: "Returns", format: (val: string) => <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>{val}</Typography> },
  ];

  const topAgents = [
    { agent: "QuickTel Agents", sales: "KES 142k", status: "Platinum" },
    { agent: "M-Pesa Shop", sales: "KES 98k", status: "Gold" },
    { agent: "Connect Hub", sales: "KES 45k", status: "Silver" },
  ];

  return (
    <Container maxWidth={false} sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight={600}>Recent Submission</Typography>
          <Box 
            sx={{ 
                position: "relative",
                display: "flex", 
                bgcolor: "#f0f2f5", 
                p: 0.5, 
                borderRadius: 2,
                border: "1px solid #e0e0e0"
            }}
          >
            {/* Sliding Highlight */}
            <Box 
                sx={{ 
                    position: "absolute",
                    top: 4,
                    bottom: 4,
                    left: activeMode === "out" ? 4 : "50%",
                    width: "calc(50% - 4px)",
                    bgcolor: "var(--safaricom-green)",
                    borderRadius: 1.5,
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: "0 4px 10px rgba(27, 147, 48, 0.3)",
                    zIndex: 0
                }}
            />
            <Button 
                size="small"
                onClick={() => setActiveMode("out")}
                startIcon={<AddCircleOutline sx={{ zIndex: 1, color: activeMode === "out" ? "#fff" : "#666" }} />}
                sx={{ 
                    position: "relative",
                    flex: 1,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    color: activeMode === "out" ? "#fff" : "#666",
                    transition: "color 0.3s",
                    zIndex: 1,
                    "&:hover": { bgcolor: "transparent" }
                }}
            >
                DECLARE OUT SIM
            </Button>
            <Button 
                size="small"
                onClick={() => setActiveMode("inbound")}
                startIcon={<HistoryIcon sx={{ zIndex: 1, color: activeMode === "inbound" ? "#fff" : "#666" }} />}
                sx={{ 
                    position: "relative",
                    flex: 1,
                    px: 3,
                    py: 1,
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    color: activeMode === "inbound" ? "#fff" : "#666",
                    transition: "color 0.3s",
                    zIndex: 1,
                    "&:hover": { bgcolor: "transparent" }
                }}
            >
                DECLARE INBOUND
            </Button>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* Main Submission Details */}
          <Grid item xs={12} md={8.5}>
            <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
              <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" fontWeight={600}>Recent Submissions</Typography>
                  <Chip
                    label="Submitted"
                    size="small"
                    color="success"
                    sx={{ fontWeight: 700, borderRadius: 1.5 }}
                  />
                </Stack>
              </Box>
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6} md={3}>
                    <Typography variant="caption" color="text.secondary">DIR Placeholder</Typography>
                    <Typography variant="body2" fontWeight={600}>Definitions</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="caption" color="text.secondary">Services</Typography>
                    <Typography variant="body2" fontWeight={600}>International</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="caption" color="text.secondary">Region</Typography>
                    <Typography variant="body2" fontWeight={600}>RIFT VALLEY</Typography>
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <Typography variant="caption" color="text.secondary">Condition</Typography>
                    <Typography variant="body2" fontWeight={600} sx={{ transition: "all 0.3s" }}>
                        {activeMode === "out" ? "SIM Serials" : "Inbound Recv"}
                    </Typography>
                  </Grid>
                </Grid>
                <DataTable columns={serialColumns} rows={recentSerials} />
              </Box>
            </Card>
          </Grid>

          {/* Summary Card */}
          <Grid item xs={12} md={3.5}>
            <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: "#1b9330", color: "#fff", height: "100%" }}>
              <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle2" fontWeight={700}>Summary Overview - SIMS</Typography>
                  <InfoOutlined sx={{ fontSize: 18, opacity: 0.8 }} />
                </Stack>
              </Box>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                   <Box sx={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center", border: "8px solid rgba(255,255,255,0.2)", borderRadius: "50%" }}>
                     <Box sx={{ textAlign: "center" }}>
                        <Typography variant="h4" fontWeight={600}>84%</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8 }}>COMPLIANCE</Typography>
                     </Box>
                   </Box>
                </Box>
                <Stack spacing={1.5}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 1 }}>
                    <Typography variant="body2">SIMS Allocated</Typography>
                    <Typography variant="body2" fontWeight={700}>120</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.1)", pb: 1 }}>
                    <Typography variant="body2">SIMS Sold</Typography>
                    <Typography variant="body2" fontWeight={700}>100</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2">Returns Pending</Typography>
                    <Typography variant="body2" fontWeight={700}>20</Typography>
                  </Box>
                </Stack>
              </Box>
            </Card>
          </Grid>

          {/* Statistics Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 1, mb: 1.5 }}>Recent Submission Statistics</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                    <Typography variant="subtitle2" fontWeight={600}>Sales Trends</Typography>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <StatusDonutChart />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
                    <Typography variant="subtitle2" fontWeight={600}>Monthly Usage Statistics</Typography>
                  </Box>
                  <Box sx={{ p: 1 }}>
                    <WeeklyBarChart />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={3}>
                <Card variant="outlined" sx={{ borderRadius: 2, height: "100%" }}>
                  <Box sx={{ p: 2, borderBottom: "1px solid #eee", bgcolor: "#fff" }}>
                    <Typography variant="subtitle2" fontWeight={600}>Performance Overview</Typography>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Stack spacing={2.5}>
                      {topAgents.map((item, i) => (
                        <Box key={i} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box>
                            <Typography variant="body2" fontWeight={700}>{item.agent}</Typography>
                            <Typography variant="caption" color="text.secondary">{item.status}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight={700} color="primary">{item.sales}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
