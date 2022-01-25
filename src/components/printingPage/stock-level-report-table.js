import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({ stockLevel }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product Name</TableCell>
            <TableCell align="right">Barcode</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Supplier</TableCell>
            <TableCell align="right">Cost Price</TableCell>
            <TableCell align="right">Current Quantity</TableCell>
            <TableCell align="right">Previous Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockLevel.map((row) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.product_name}
              </TableCell>
              <TableCell align="right">{row.product_barcode}</TableCell>
              <TableCell align="right">{row.product_brand}</TableCell>
              <TableCell align="right">{row.supplier}</TableCell>
              <TableCell align="right">{`₦${row.product_price}`}</TableCell>
              <TableCell align="right">{row.current_product_quantity}</TableCell>
              <TableCell align="right">{row.previous_product_quantity}</TableCell>
              <TableCell align="right">
                {`₦${Number(row.current_product_quantity) * Number(row.product_price)}`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
