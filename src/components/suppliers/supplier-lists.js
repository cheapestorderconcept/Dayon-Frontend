import MUIDataTable from "mui-datatables";
import { useContext, useEffect, useState } from "react";
import { deleteSupplier, getSuppliers } from "src/statesManagement/store/actions/supplier-action";
import { Store } from "src/statesManagement/store/store";
import { Button, Typography } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
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

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete");
    const supId = tableMeta.rowData[0];
    deleteSupplier({
      dispatch: dispatch,
      supId: supId,
      enqueueSnackbar: enqueueSnackbar,
      Router: Router,
    });
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
                href={`/suppliers/${tableMeta.rowData[1]}`}
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
      name: "supplier_name",
      label: "Supplier Name",
    },
    {
      name: "supplier_email",
      label: "Email",
    },
    {
      name: "supplier_phone",
      label: "Phone",
    },
    {
      name: "supplier_address",
      label: "Address",
    },
    {
      name: "contact_person",
      label: "Contact Person",
    },
  ];

  // const supp = suppliers.map((supp) => Object.values(supp));
  // console.log(suppliers);
  const supp = suppliers.map((supp, i) => {
    return {
      delete: `${supp._id}`,
      update: `${supp._id}`,
      supplier_name: `${supp.supplier_name}`,
      supplier_email: `${supp.supplier_email}`,
      supplier_phone: `${supp.supplier_phone}`,
      supplier_address: `${supp.supplier_address}`,
      contact_person: `${supp.contact_person}`,
    };
  });

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
    responsive: "simple",
  };

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Suppliers"}
          data={supp}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default SuppliersList;
