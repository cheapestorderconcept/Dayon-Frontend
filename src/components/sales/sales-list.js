import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { addSalesData } from "src/statesManagement/store/actions/sales-action";
import { Store } from "src/statesManagement/store/store";

const SalesList = ({ salesList }) => {
  const { dispatch, state } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      name: "Sales Id",
    },
    {
      name: "Invoice Number ",
    },
    {
      name: "Total Amount",
    },
    {
      name: "Payment Type",
    },
    {
      name: "Branch",
    },
    {
      name: "Date",
    },
  ];
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);
  const sales = salesList.map((item) => Object.values(item));

  const newArray = sales.map((arr) =>
    arr.filter((arr) => {
      return typeof arr !== "object";
    })
  );

  let itemsArray;

  itemsArray = sales.map((arr) =>
    arr.filter((arr) => {
      if (typeof arr === "object") {
        return arr;
      }
    })
  );

  const data = [...newArray];

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
    responsive: "simple",
  };

  return (
    <>
      {ready == true && (
        <>
          <MUIDataTable title={"Lists Of Sales"} data={data} columns={columns} options={options} />
        </>
      )}
    </>
  );
};

export default SalesList;
