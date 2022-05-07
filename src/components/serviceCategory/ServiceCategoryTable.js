import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import { Store } from "src/statesManagement/store/store";
import { deleteBrand } from "src/statesManagement/store/actions/brand-action";
import { useSnackbar } from "notistack";
import { deleteServiceCategory } from "src/statesManagement/store/actions/services-action";

const ServiceCategoryTable = ({ categories }) => {
  const { dispatch } = useContext(Store);
  

  const Router = useRouter();

  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);



  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (tableMeta) => (e) => {
    const validate = confirm("Are you sure you want to delete");
    if (!!validate) {
      const categoryId = tableMeta.rowData[0];
      deleteServiceCategory({
        dispatch: dispatch,
        categoryId: categoryId,
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
      name: "Update_Category",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button variant="contained">
              <NextLink
                href={`/services/category/${tableMeta.rowData[0]}`}
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

  const category = categories.categories?.map((cat, i) => {
    return {
      delete: `${cat._id}`,
      Update_category: `${cat._id}`,
      name: `${cat.categories_name}`,
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
        <MUIDataTable title={"Lists Of Brands"} data={category} columns={columns} options={options} />
      )}
    </>
  );
};

export default ServiceCategoryTable;
