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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.items?.map((item, i) => (
                    <TableRow key={item.barcode}>
                      <TableCell component="th" scope="row">
                        {item.barcode}
                      </TableCell>
                      <TableCell>{item.product}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.selling_price}</TableCell>
                      {/* <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ salesReport }) {
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
          {salesReport.map((row, index) => (
            <Row key={row._id} row={row} index={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
