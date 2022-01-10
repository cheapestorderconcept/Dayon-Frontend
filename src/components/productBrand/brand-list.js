import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { Store } from "src/statesManagement/store/store";
import { deleteBrand } from "src/statesManagement/store/actions/brand-action";

const BrandTable = ({ brands }) => {
  const { dispatch } = useContext(Store);
  console.log(brands);

  const Router = useRouter();

  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);

  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete");
    const brandId = tableMeta.rowData[2];
    deleteBrand(dispatch, brandId, Router);
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
                href={`/products/brand/${tableMeta.rowData[2]}`}
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
      name: "INDEX",
    },
  ];

  const brand = brands.map((brand) => Object.values(brand));
  console.log(brand);
  const data = [...brand];

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
  };
  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Brands"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default BrandTable;
