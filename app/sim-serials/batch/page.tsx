"use client";

import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Typography,
  Chip,
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  TextField,
} from "@mui/material";
import {
  CloudUpload,
  ArrowForward,
  ArrowBack,
  CheckCircleOutline,
  ErrorOutline,
  TableChart,
} from "@mui/icons-material";
import { useState, useRef } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";

const MOCK_BATCH_RESULTS = [
  { serial: "89254021274269654001", status: "Valid", message: "Allocated to dealer – eligible for return" },
  { serial: "89254021274269654002", status: "Valid", message: "Allocated to dealer – eligible for return" },
  { serial: "89254021274269654003", status: "Invalid", message: "Serial not found in inventory" },
  { serial: "89254021274269654004", status: "Valid", message: "Allocated to dealer – eligible for return" },
  { serial: "89254021274269654005", status: "Duplicate", message: "Serial already submitted in this batch" },
];

export default function SimSerialsBatchPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [batchMethod, setBatchMethod] = useState<"range" | "csv">("csv");
  const [rangeStart, setRangeStart] = useState("");
  const [rangeEnd, setRangeEnd] = useState("");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleProcessBatch = () => {
    setActiveStep(2);
    setProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          setActiveStep(3);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <Container maxWidth={false} className="animate-fadeInUp" sx={{ p: 0 }}>
      <Stack spacing={2} sx={{ pt: 1, pb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5, px: { xs: 2, md: 3 } }}>
          <Typography variant="h5" fontWeight={600}>Batch Validation</Typography>
          <Button variant="outlined" component={NextLink} href="/sim-serials" startIcon={<ArrowBack />} size="small" sx={{ fontWeight: 600, borderRadius: 1.5, textTransform: "none" }}>Back to List</Button>
        </Box>

        <Card variant="outlined" sx={{ borderRadius: 0, overflow: "hidden" }}>
          <Box sx={{ p: 3 }}>
            <Stepper activeStep={activeStep} orientation="horizontal" sx={{ mb: 4, display: { xs: 'none', sm: 'flex' } }}>
              <Step><StepLabel>Select Method</StepLabel></Step>
              <Step><StepLabel>Provide Data</StepLabel></Step>
              <Step><StepLabel>Processing</StepLabel></Step>
              <Step><StepLabel>Results</StepLabel></Step>
            </Stepper>

            {activeStep === 0 && (
              <Box sx={{ maxWidth: 600, mx: "auto" }}>
                <FormControl>
                  <FormLabel sx={{ fontSize: "0.85rem", mb: 1 }}>How would you like to submit serials?</FormLabel>
                  <RadioGroup
                    value={batchMethod}
                    onChange={(e) => setBatchMethod(e.target.value as "range" | "csv")}
                    row
                  >
                    <FormControlLabel
                      value="csv"
                      control={<Radio size="small" />}
                      label={<Box><Typography variant="body2" fontWeight={600}>Upload CSV File</Typography><Typography variant="caption" color="text.secondary">Upload a CSV file with serial numbers</Typography></Box>}
                      sx={{ mr: 4, alignItems: "flex-start", mt: 0.5 }}
                    />
                    <FormControlLabel
                      value="range"
                      control={<Radio size="small" />}
                      label={<Box><Typography variant="body2" fontWeight={600}>Serial Number Range</Typography><Typography variant="caption" color="text.secondary">Enter start and end bounds</Typography></Box>}
                      sx={{ alignItems: "flex-start", mt: 0.5 }}
                    />
                  </RadioGroup>
                </FormControl>
                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="contained" endIcon={<ArrowForward />} onClick={() => setActiveStep(1)} size="small" sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600 }}>Next Step</Button>
                </Box>
              </Box>
            )}

            {activeStep === 1 && (
              <Box sx={{ maxWidth: 600, mx: "auto" }}>
                {batchMethod === "csv" ? (
                  <Box
                    onClick={() => fileRef.current?.click()}
                    sx={{
                      border: "2px dashed", borderColor: csvFile ? "success.main" : "divider", borderRadius: 1, p: 4, textAlign: "center", cursor: "pointer",
                      bgcolor: csvFile ? "rgba(46,204,113,0.04)" : "#fafafa", transition: "all 0.2s", "&:hover": { borderColor: "var(--safaricom-green)", bgcolor: "rgba(27,147,48,0.03)" }
                    }}
                  >
                    <CloudUpload sx={{ fontSize: 40, color: csvFile ? "success.main" : "text.disabled", mb: 1 }} />
                    <Typography variant="body2" fontWeight={600} color={csvFile ? "success.main" : "text.secondary"}>{csvFile ? csvFile.name : "Click to upload CSV file"}</Typography>
                    <Typography variant="caption" color="text.disabled">{csvFile ? `${(csvFile.size / 1024).toFixed(1)} KB` : "Accepts .csv files • Serial numbers in column A"}</Typography>
                    <input ref={fileRef} type="file" accept=".csv" hidden onChange={(e) => setCsvFile(e.target.files?.[0] || null)} />
                  </Box>
                ) : (
                  <Stack spacing={2.5}>
                    <Typography variant="body2" fontWeight={600}>Enter serials range and upload CSV:</Typography>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                      <TextField
                        fullWidth
                        label="Start Range"
                        placeholder="e.g 892540..."
                        size="small"
                        value={rangeStart}
                        onChange={(e) => setRangeStart(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                      />
                      <TextField
                        fullWidth
                        label="End Range"
                        placeholder="e.g 892540..."
                        size="small"
                        value={rangeEnd}
                        onChange={(e) => setRangeEnd(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                      />
                    </Stack>
                    <Box
                      onClick={() => fileRef.current?.click()}
                      sx={{
                        border: "2px dashed", borderColor: csvFile ? "success.main" : "divider", borderRadius: 1, p: 3, textAlign: "center", cursor: "pointer",
                        bgcolor: csvFile ? "rgba(46,204,113,0.04)" : "#fafafa", transition: "all 0.2s", "&:hover": { borderColor: "var(--safaricom-green)", bgcolor: "rgba(27,147,48,0.03)" }
                      }}
                    >
                      <CloudUpload sx={{ fontSize: 32, color: csvFile ? "success.main" : "text.disabled", mb: 1 }} />
                      <Typography variant="body2" fontWeight={600} color={csvFile ? "success.main" : "text.secondary"}>{csvFile ? csvFile.name : "Click to upload CSV file"}</Typography>
                      <Typography variant="caption" color="text.disabled">{csvFile ? `${(csvFile.size / 1024).toFixed(1)} KB` : "Accepts .csv files"}</Typography>
                      <input ref={fileRef} type="file" accept=".csv" hidden onChange={(e) => setCsvFile(e.target.files?.[0] || null)} />
                    </Box>
                  </Stack>
                )}
                <Stack direction="row" spacing={1} sx={{ mt: 3, justifyContent: "space-between" }}>
                  <Button size="small" startIcon={<ArrowBack />} onClick={() => setActiveStep(0)} sx={{ fontWeight: 600 }}>Back</Button>
                  <Button variant="contained" onClick={handleProcessBatch} size="small" disabled={batchMethod === "csv" ? !csvFile : false} sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600 }}>Start Verification</Button>
                </Stack>
              </Box>
            )}

            {activeStep === 2 && (
              <Box sx={{ maxWidth: 600, mx: "auto", py: 4, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Validating serials against allocation records...</Typography>
                <LinearProgress variant={processing ? "determinate" : "indeterminate"} value={progress} sx={{ height: 8, borderRadius: 2, bgcolor: "rgba(27,147,48,0.1)", "& .MuiLinearProgress-bar": { bgcolor: "var(--safaricom-green)" }, mb: 2 }} />
                <Typography variant="h6" fontWeight={600} color="primary.main">{progress}%</Typography>
              </Box>
            )}

            {activeStep === 3 && (
              <Box sx={{ maxWidth: 800, mx: "auto" }}>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Chip icon={<CheckCircleOutline />} label={`${MOCK_BATCH_RESULTS.filter(r => r.status === "Valid").length} Valid`} color="success" size="small" />
                  <Chip icon={<ErrorOutline />} label={`${MOCK_BATCH_RESULTS.filter(r => r.status !== "Valid").length} Issues`} color="error" size="small" variant="outlined" />
                </Stack>
                <TableContainer component={Paper} elevation={0} variant="outlined" sx={{ borderRadius: 0 }}>
                  <Table size="small">
                    <TableHead sx={{ bgcolor: "#F8F9FA" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.75rem", textTransform: "uppercase" }}>Serial Number</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.75rem", textTransform: "uppercase" }}>Status</TableCell>
                        <TableCell sx={{ fontWeight: 600, color: "rgba(0,0,0,0.5)", fontSize: "0.75rem", textTransform: "uppercase" }}>Message</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {MOCK_BATCH_RESULTS.map((row, i) => (
                        <TableRow key={i} hover>
                          <TableCell><Typography variant="body2" sx={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{row.serial}</Typography></TableCell>
                          <TableCell><Chip label={row.status} size="small" color={row.status === "Valid" ? "success" : row.status === "Duplicate" ? "warning" : "error"} sx={{ height: 20, fontSize: "0.7rem" }} /></TableCell>
                          <TableCell><Typography variant="caption" color="text.secondary">{row.message}</Typography></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack direction="row" spacing={1} sx={{ mt: 3, justifyContent: "flex-end" }}>
                  <Button variant="outlined" startIcon={<TableChart />} size="small" sx={{ fontWeight: 600 }}>Export Results</Button>
                  <Button component={NextLink} href="/sim-serials" variant="contained" size="small" sx={{ bgcolor: "var(--safaricom-green)", fontWeight: 600 }}>Done</Button>
                </Stack>
              </Box>
            )}
          </Box>
        </Card>
      </Stack>
    </Container>
  );
}
