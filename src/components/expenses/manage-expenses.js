import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { deleteExpenses } from "src/statesManagement/store/actions/expense-action";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";

const ManageExpenses = ({ expenses }) => {
  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const [ready, setready] = useState(false);
  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete");
    const expId = tableMeta.rowData[2];
    // console.log(expId);
    deleteExpenses({ dispatch: dispatch, expId: expId, enqueueSnackbar: enqueueSnackbar });
  };
  const columns = [
    {
      name: "Delete",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button onClick={handleDelete(tableMeta)} variant="contained" color="error">
              Delete
            </Button>
          );
        },
      },
    },
    {
      name: "Edit",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/expenses/${tableMeta.rowData[2]}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="body1" color="inherit">
                  Edit
                </Typography>
              </NextLink>
            </Button>
          );
        },
      },
    },
    {
      name: "ID",
    },
    {
      name: "DATE CREATED",
    },
    {
      name: "AMOUNT",
    },
    {
      name: "CATEGORY",
    },
    {
      name: "ADDITIONAL DETAILS",
    },
  ];

  const exp = expenses.map((exp) => Object.values(exp));
  const data = [...exp];
  const options = {
    filter: true,
    sort: true,
    responsive: "simple",
  };
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Expenses"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default ManageExpenses;
