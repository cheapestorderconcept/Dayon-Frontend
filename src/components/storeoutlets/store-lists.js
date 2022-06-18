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
   const validate = confirm("Are you sure you want to delete");
    const storeID = tableMeta.rowData[0];
      if (!!validate) {
        deleteStore({
          dispatch: dispatch,
          storeID: storeID,
    
          enqueueSnackbar: enqueueSnackbar,
        });
      }
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
              <Typography variant="body1" color="inherit">
                Delete
              </Typography>
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
                href={`/store/${tableMeta.rowData[1]}`}
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
      label: "Branch Name",
    },
    {
      name: "address",
      label: "Address",
    },
    {
      name: "manager_name",
      label: "Manager/Contact Person",
    },

    {
      name: "phone",
      label: "Phone",
    },
  ];

  const myBranch = branch.map((brch, i) => {
    return {
      delete: `${brch._id}`,
      update: `${brch._id}`,
      name: `${brch.branch_name}`,
      manager_name: `${brch.manager_name}`,
      phone: `${brch.manager_phone}`,
      address: `${brch.address}`,
    };
  });
  const options = {
    filter: true,
    sort: true,
    responsive: "simple",
  };
  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Stores"}
          data={myBranch}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default StoreOuletLists;
