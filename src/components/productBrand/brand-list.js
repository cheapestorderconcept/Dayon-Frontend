import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { Store } from "src/statesManagement/store/store";
import { deleteBrand } from "src/statesManagement/store/actions/brand-action";
import { useSnackbar } from "notistack";

const BrandTable = ({ brands }) => {
  const { dispatch } = useContext(Store);
  console.log(brands);

  const Router = useRouter();

  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (tableMeta) => (e) => {
    const validate = confirm("Are you sure you want to delete");
    if (!!validate) {
      const brandId = tableMeta.rowData[0];
      deleteBrand({
        dispatch: dispatch,
        brandId: brandId,
        Router: Router,
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
      name: "Update_brand",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/products/brand/${tableMeta.rowData[1]}`}
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
      label: "Name",
    },
  ];

  const brand = brands?.map((pro, i) => {
    return {
      delete: `${pro._id}`,
      Update_brand: `${pro._id}`,
      name: `${pro.brand_name}`,
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
        <MUIDataTable title={"Lists Of Brands"} data={brand} columns={columns} options={options} />
      )}
    </>
  );
};

export default BrandTable;
