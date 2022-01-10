import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import { deleteSupplier, getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { Store } from "src/statesManagement/store/store";
import { Button, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
const SuppliersList = () => {
  const { dispatch, state } = useContext(Store);
  const { suppliers } = state;
  const Router = useRouter();

  const [ready, setready] = useState(false);
  const [render, setrender] = useState(false);
  useEffect(() => {
    setready(true);
    // getSuppliers(dispatch);
  }, []);

  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete");
    const supId = tableMeta.rowData[2];
    deleteSupplier(dispatch, supId, Router);
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
                href={`/suppliers/${tableMeta.rowData[2]}`}
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
      name: "NAME",
    },
    {
      name: "ADDRESS",
    },
    {
      name: "PHONE",
    },
    {
      name: "EMAIL",
    },
    {
      name: "CONTACT PERSON",
    },
  ];

  const supp = suppliers.map((supp) => Object.values(supp));
  const data = [...supp];

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
  };

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Suppliers"}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default SuppliersList;
