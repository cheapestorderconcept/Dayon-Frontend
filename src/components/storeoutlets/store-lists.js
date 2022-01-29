import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useEffect, useState, useContext } from "react";
import { deleteStore } from "src/statesManagement/store/actions/store-outlet-action";
import NextLink from "next/link";
import { Store } from "src/statesManagement/store/store";
import { useSnackbar } from "notistack";

const StoreOuletLists = ({ branch }) => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  const { dispatch } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete");
    const storeID = tableMeta.rowData[2];
    deleteStore({
      dispatch: dispatch,
      storeID: storeID,

      enqueueSnackbar: enqueueSnackbar,
    });
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
              <Typography variant="body1" color="inherit">
                Delete
              </Typography>
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
                href={`/store/${tableMeta.rowData[2]}`}
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
      name: "STORE NAME",
    },
    {
      name: "ADDRESS",
    },
    {
      name: "MANAGER/CONTACT PERSON",
    },
    {
      name: "PHONE",
    },
  ];

  const myBranch = branch.map((brch) => Object.values(brch));
  const data = [...myBranch];

  const options = {
    filter: true,
    sort: true,
    responsive: "simple",
  };
  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Stores"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default StoreOuletLists;
