import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import { addSalesData } from "src/statesManagement/store/actions/sales-action";
import { Store } from "src/statesManagement/store/store";

const SalesList = ({ cart }) => {
  const { dispatch, state } = useContext(Store);
  const handleSubmitSalesData = () => {
    cart.cartItems.map((data) => {
      const salesData = {
        product_name: data.product_name,
        product_barcode: data.product_barcode,
        invoice_number: data.invoice_number,
        unit_price: `${data.unit_price}`,
        purchased_qty: data.purchased_qty,
        total_amount: data.total_amount,
        payment_type: data.payment_type,
        created_at: data.created_at,
        branch: data.branch,
      };
      console.log(salesData);
      addSalesData(dispatch, salesData);
    });
  };
  const columns = [
    {
      name: "Date",
    },
    {
      name: "Invoice no",
    },
    {
      name: "Branch",
    },
    {
      name: "Product Name",
    },
    {
      name: "Quantity",
    },
    {
      name: "Price Per Unit",
    },
    {
      name: "Payment Method",
    },
    {
      name: "Total Amount",
    },
    {
      name: "Barcode",
    },
  ];
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);
  const sales = cart.cartItems.map((item) => Object.values(item));

  const data = [...sales];

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
    responsive: true,
  };

  return (
    <>
      {ready == true && (
        <>
          <MUIDataTable title={"Lists Of Sales"} data={data} columns={columns} options={options} />
          <Button variant="contained" fullWidth={true} onClick={handleSubmitSalesData}>
            <Typography variant="h6"> Submit Sales Data</Typography>
          </Button>
        </>
      )}
    </>
  );
};

export default SalesList;
