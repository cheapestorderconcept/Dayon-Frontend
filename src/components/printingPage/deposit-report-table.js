import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ depositReport }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Invoice Number</TableCell>
            <TableCell align="right">Store</TableCell>
            <TableCell align="right">Customer Name </TableCell>
            <TableCell align="right">Amount Paid</TableCell>
            <TableCell align="right">Amount To Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {depositReport.map((row, index) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="right">{index + 1}</TableCell>
              <TableCell component="th" scope="row">
                {row.created_at}
              </TableCell>
              <TableCell align="right">{row.invoice_number}</TableCell>
              <TableCell align="right">{row.branch}</TableCell>
              <TableCell align="right">{row.customer_name}</TableCell>
              <TableCell align="right">{`₦${row.amount_deposited}`}</TableCell>
              <TableCell align="right">{`₦${row.amount_to_balance}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
