"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { Dayjs } from "dayjs";
import { Alert as SuiAlert, InputField, SuiDatePicker } from "@safaricom/sui";
import { MOCK_RESELLERS } from "@/lib/mockData";
import {
  mockValidateSerialsInput,
  mockValidateReseller,
  mockValidateNationalId,
  mockFetchDestinations,
  mockSubmitReturn,
} from "@/lib/mockApi";

export function SingleReturnForm() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [serialInput, setSerialInput] = useState("894000000000042");
  const [serials, setSerials] = useState<string[]>([]);

  const [resellerId, setResellerId] = useState(MOCK_RESELLERS[0].id);
  const [nationalId, setNationalId] = useState("12345678");
  const [destinationCode, setDestinationCode] = useState("");
  const [location, setLocation] = useState("Westlands Mall");
  const [contactPerson, setContactPerson] = useState("Jane W.");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  async function handleValidateSerials() {
    setError(null);
    setBusy(true);
    const v = await mockValidateSerialsInput(serialInput);
    setBusy(false);
    if (!v.ok) {
      setError(v.error);
      setSerials([]);
      return;
    }
    setSerials(v.serials);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!serials.length) {
      setError("Validate serials first.");
      return;
    }
    if (!startDate || !endDate) {
      setError("Select return start and end dates.");
      return;
    }
    setBusy(true);
    const r = await mockValidateReseller(resellerId);
    if (!r.exists) {
      setBusy(false);
      setError("Invalid reseller.");
      return;
    }
    const i = await mockValidateNationalId(nationalId);
    if (!i.valid) {
      setBusy(false);
      setError(i.message);
      return;
    }
    const d = await mockFetchDestinations();
    const dest = destinationCode || d[0]?.code;
    if (!dest || !location.trim() || !contactPerson.trim()) {
      setBusy(false);
      setError("Fill destination, location, and contact.");
      return;
    }
    const sub = await mockSubmitReturn({
      mode: "single",
      serials,
      resellerId,
      nationalId,
      destinationCode: dest,
      location,
      contactPerson,
      returnStartDate: startDate.format("YYYY-MM-DD"),
      returnEndDate: endDate.format("YYYY-MM-DD"),
    });
    setBusy(false);
    if (sub.ok) router.push(`/returns/success?ref=${encodeURIComponent(sub.reference)}`);
  }

  return (
    <Stack spacing={3} maxWidth={560} mx="auto" component="form" onSubmit={handleSubmit}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Single serial return
          </Typography>
          <Typography variant="body2" color="text.secondary">
            One field for an individual serial or small range (e.g.{" "}
            <Box component="code" sx={{ bgcolor: "action.hover", px: 0.5, borderRadius: 0.5 }}>
              894…-894…
            </Box>
            ).
          </Typography>
        </Box>
        <Button component={NextLink} href="/returns" size="small">
          Back
        </Button>
      </Stack>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Serials
        </Typography>
        <InputField
          formControlProps={{ fullWidth: true }}
          inputLabelProps={{ children: "Serial / range" }}
          value={serialInput}
          onChange={(e) => setSerialInput(e.target.value)}
          sx={{ fontFamily: "monospace" }}
        />
        <Button type="button" variant="outlined" sx={{ mt: 2 }} onClick={handleValidateSerials} disabled={busy}>
          {busy ? "Checking…" : "Validate serials"}
        </Button>
        {serials.length ? (
          <Typography variant="caption" color="success.main" display="block" mt={1}>
            OK — {serials.length} serial(s): {serials.join(", ")}
          </Typography>
        ) : null}
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Reseller &amp; identity
        </Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel id="res-label">Reseller</InputLabel>
          <Select
            labelId="res-label"
            label="Reseller"
            value={resellerId}
            onChange={(e) => setResellerId(e.target.value as string)}
          >
            {MOCK_RESELLERS.map((r) => (
              <MenuItem key={r.id} value={r.id}>
                {r.name} ({r.id})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="National ID (IPRS)"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          InputProps={{ sx: { fontFamily: "monospace" } }}
        />
      </Paper>

      <Paper variant="outlined" sx={{ p: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Destination &amp; period
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" mb={1}>
          Destinations load on submit (same mock service as batch). Optional preset code below.
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Destination code (optional)"
          value={destinationCode}
          onChange={(e) => setDestinationCode(e.target.value)}
          placeholder="Leave empty to use first from API"
        />
        <TextField
          fullWidth
          margin="normal"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Contact person"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
        />
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }} mt={1}>
          <SuiDatePicker
            label="Return start"
            value={startDate}
            onChange={(v) => setStartDate(v)}
            format="DD/MM/YYYY"
            slotProps={{ textField: { fullWidth: true } }}
          />
          <SuiDatePicker
            label="Return end"
            value={endDate}
            onChange={(v) => setEndDate(v)}
            format="DD/MM/YYYY"
            slotProps={{ textField: { fullWidth: true } }}
          />
        </Stack>
      </Paper>

      {error ? <SuiAlert severity="error">{error}</SuiAlert> : null}

      <Button type="submit" variant="contained" size="large" disabled={busy}>
        {busy ? "Submitting…" : "Submit distribution return"}
      </Button>
    </Stack>
  );
}
