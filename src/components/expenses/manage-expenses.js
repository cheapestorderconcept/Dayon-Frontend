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
    const expId = tableMeta.rowData[0];
    // console.log(expId);
    deleteExpenses({ dispatch: dispatch, expId: expId, enqueueSnackbar: enqueueSnackbar });
  };
  const columns = [
    {
      name: "delete",
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
      name: "update",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/expenses/${tableMeta.rowData[1]}`}
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
      name: "name",
      label: "Expenses",
    },
    {
      name: "exp_type",
      label: "Category",
    },
    {
      name: "amount",
      label: "Amount",
    },
    {
      name: "add_details",
      label: "Details",
    },
    {
      name: "date",
      label: "Date",
    },
  ];

  // const exp = expenses.map((exp) => Object.values(exp));
  // console.log(expenses);
  const exp = expenses.map((exp, i) => {
    return {
      delete: `${exp._id}`,
      update: `${exp._id}`,
      name: `${exp.branch_name}`,
      exp_type: `${exp.expenses_type}`,
      amount: `${exp.amount}`,
      add_details: `${exp.additional_details}`,
      date: `${exp.date}`,
    };
  });

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
        <MUIDataTable title={"Lists Of Expenses"} data={exp} columns={columns} options={options} />
      )}
    </>
  );
};

export default ManageExpenses;
