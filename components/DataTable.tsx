"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";

interface Column {
  id: string;
  label: string;
  align?: "left" | "right" | "center";
  minWidth?: number;
  format?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  rows: any[];
  initialRowsPerPage?: number;
}

export function DataTable({ columns, rows, initialRowsPerPage = 5 }: DataTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={0} sx={{ width: "100%", overflow: "hidden", borderRadius: 0 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 500, backgroundColor: "#F8F9FA", color: "rgba(0,0,0,0.6)", padding: "12px 16px" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ fontSize: "0.85rem" }}>
                          {column.format ? column.format(value, row) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

//Updtaedwqfqwd