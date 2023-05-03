import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { numberWithCommas } from "src/utils/helpers";

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
            {/* <TableCell align="right">Previous Quantity</TableCell> */}
            <TableCell align="right">Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stockLevel?.mProduct?.map((row) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.product_name}
              </TableCell>
              <TableCell align="right">{row.product_barcode}</TableCell>
              <TableCell align="right">{row.product_brand}</TableCell>
              <TableCell align="right">{row.supplier}</TableCell>
              <TableCell align="right">{`₦${row.product_price}`}</TableCell>
              <TableCell align="right">{row.current_product_quantity}</TableCell>
              {/* <TableCell align="right">{row.previous_product_quantity}</TableCell> */}
              <TableCell align="right">
                {`₦${numberWithCommas(
                  Number(row.current_product_quantity * row.product_price).toFixed(2)
                )}`}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>
              <Typography variant="h6">Total</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">{`₦${numberWithCommas(
                stockLevel?.mProduct
                  ?.reduce((a, c) => a + Number(c.current_product_quantity * c.product_price), 0)
                  .toFixed(2)
              )}`}</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
