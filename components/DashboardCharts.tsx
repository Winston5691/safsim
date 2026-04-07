"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Box, Typography, Stack } from "@mui/material";

const COLORS = ["#1b9330", "#8bc34a", "#cddc39", "#ffeb3b"];

const STATUS_DATA = [
  { name: "Allocated", value: 400 },
  { name: "Sold", value: 300 },
  { name: "In Stock", value: 200 },
  { name: "Returned", value: 100 },
];

const WEEKLY_DATA = [
  { day: "Mon", sims: 120 },
  { day: "Tue", sims: 150 },
  { day: "Wed", sims: 200 },
  { day: "Thu", sims: 180 },
  { day: "Fri", sims: 250 },
  { day: "Sat", sims: 140 },
  { day: "Sun", sims: 90 },
];

export function StatusDonutChart() {
  return (
    <Box sx={{ height: 210, width: "100%", position: "relative" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={STATUS_DATA}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={5}
            dataKey="value"
          >
            {STATUS_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          84%
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Compliance
        </Typography>
      </Box>
    </Box>
  );
}

export function WeeklyBarChart() {
  return (
    <Box sx={{ height: 210, width: "100%" }}>
      <ResponsiveContainer>
        <BarChart data={WEEKLY_DATA}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#999" }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: "#999" }} 
          />
          <Tooltip cursor={{ fill: "rgba(27, 147, 48, 0.05)" }} />
          <Bar dataKey="sims" fill="#1b9330" radius={[4, 4, 0, 0]} barSize={25} />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
