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
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Product Barcode</TableCell>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Cost Price</TableCell>
                    <TableCell>Selling Price</TableCell>
                    <TableCell>Total Cost Price</TableCell>
                    <TableCell>Total Selling Price</TableCell>
                    <TableCell>Profit/Loss</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.items?.map((item, i) => {
                    const total_costPrice = Number(item.cost_price) * Number(item.quantity);
                    const profit_or_loss = Number(item.amount) - Number(total_costPrice);
                    return (
                      <TableRow key={item.barcode}>
                        <TableCell component="th" scope="row">
                          {item.barcode}
                        </TableCell>
                        <TableCell>{item.product}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.cost_price}</TableCell>
                        <TableCell>{item.selling_price}</TableCell>
                        <TableCell>{total_costPrice}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell
                          style={{ color: item.amount > total_costPrice ? "green" : "red" }}
                        >
                          {profit_or_loss}
                        </TableCell>
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
                        (a, c) => a + Number(c.cost_price * c.quantity),
                        0
                      )}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`₦${row?.items?.reduce(
                        (a, c) => a + Number(c.selling_price * c.quantity),
                        0
                      )}`}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{`₦${row?.items?.reduce(
                        (a, c) => a + Number(c.amount - c.cost_price * c.quantity),
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

export default function CollapsibleTable({ profitOrLossReport }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>S/N</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Invoice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profitOrLossReport.map((row, index) => (
            <Row key={row._id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
