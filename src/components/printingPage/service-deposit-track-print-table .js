import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {index + 1}
        </TableCell>
        <TableCell>{row.created_at}</TableCell>
        <TableCell>{row.invoice_number}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Barcode</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Cost Price</TableCell>
                    <TableCell>Selling Price</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.items?.map((item, i) => {
                    const total = Number(item.selling_price) * Number(item.quantity);
                    return (
                      <TableRow key={item.barcode}>
                        <TableCell component="th" scope="row">
                          {item.barcode}
                        </TableCell>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.cost_price}</TableCell>
                        <TableCell>{item.selling_price}</TableCell>
                        <TableCell>{total}</TableCell>
                        {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    {/* <TableCell></TableCell> */}
                    <TableCell>
                      <Typography variant="h6">Total </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`₦${row?.items?.reduce(
                        (a, c) => a + c.cost_price,
                        0
                      )}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`₦${row?.items?.reduce(
                        (a, c) => a + Number(c.selling_price),
                        0
                      )}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`₦${row?.items?.reduce(
                        (a, c) => a + Number(c.selling_price * c.quantity),
                        0
                      )}`}</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ depositTrack }) {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">S/N</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Service name</TableCell>
            <TableCell align="right">Amount paid </TableCell>
            <TableCell align="right">Amount To Balance</TableCell>
            <TableCell align="right">Amount To Pay</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {depositTrack?.map((row, index) => (
            <TableRow key={row._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="right">{index + 1}</TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
             <TableCell align="right">{row.customer_name}</TableCell>
              <TableCell align="right">{row.service_name}</TableCell>
              <TableCell align="right">{`₦${row.amount_paid}`}</TableCell>
              <TableCell align="right">{`₦${row.amount_to_balance}`}</TableCell>
              <TableCell align="right">{`₦${row.amount_to_pay}`}</TableCell>
            </TableRow>
          ))}
          <TableRow>
           <TableCell align="right"></TableCell> 
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right"></TableCell>
            <TableCell align="right">
              <Typography variant="h5">{`₦${depositTrack?.reduce(
                (a, c) => a + Number(c.amount_paid ),
                0
              )}`}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h5">{`₦${depositTrack?.reduce(
                (a, c) => a + Number(c.amount_to_balance ),
                0
              )}`}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="h5">{`₦${depositTrack?.reduce(
                (a, c) => a + Number(c.amount_to_pay ),
                0
              )}`}</Typography>
            </TableCell>
            
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
