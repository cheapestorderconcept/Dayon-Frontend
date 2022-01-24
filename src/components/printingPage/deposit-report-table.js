import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable({ depositReport }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Invoice Number</TableCell>
            <TableCell align="right">Store</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">No Of Items</TableCell>
            <TableCell align="right">Amount Paid</TableCell>
            <TableCell align="right">Amount To Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {depositReport.map((row) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.created_at}
              </TableCell>
              <TableCell align="right">{row.invoice_number}</TableCell>
              <TableCell align="right">{row.branch}</TableCell>
              <TableCell align="right">{row.customer_name}</TableCell>
              <TableCell align="right">{row.items.length}</TableCell>
              <TableCell align="right">{row.amount_deposited}</TableCell>
              <TableCell align="right">{row.amount_to_balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
