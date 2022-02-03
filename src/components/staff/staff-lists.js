import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import {
  deleteStaff,
  suspendStaff,
} from "src/statesManagement/store/actions/register-staff-action";
import { Store } from "src/statesManagement/store/store";
import NextLink from "next/link";

const ListOfStaff = ({ staff }) => {
  const { dispatch } = useContext(Store);

  const Router = useRouter();
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = (tableMeta) => (e) => {
    confirm("Are you sure you want to delete Staff");
    const staffId = tableMeta.rowData[1];
    deleteStaff({
      dispatch: dispatch,
      staffId: staffId,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
  };

  const handleSuspend = (tableMeta) => (e) => {
    confirm("Are you sure you want to suspend Staff");
    const staffId = tableMeta.rowData[0];
    suspendStaff({
      dispatch: dispatch,
      staffId: staffId,
      Router: Router,
      enqueueSnackbar: enqueueSnackbar,
    });
  };

  const columns = [
    {
      name: "update",
      options: {
        filter: true,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button onClick={handleSuspend(tableMeta)} variant="contained" color="warning">
              <Typography variant="body1" color="inherit">
                Suspend
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
                href={`/staff/${tableMeta.rowData[1]}`}
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
      name: "first_name",
      label: "First Name",
    },
    {
      name: "last_name",
      label: "Last Name",
    },
    {
      name: "role",
      label: "Role",
    },
    {
      name: "username",
      label: "Username",
    },
  ];

  const mystaff = staff.map((stf, i) => {
    return {
      delete: `${stf._id}`,
      update: `${stf._id}`,
      first_name: `${stf.first_name}`,
      last_name: `${stf.last_name}`,
      role: `${stf.role}`,
      username: `${stf.username}`,
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
        <MUIDataTable title={"Lists Of Staff"} data={mystaff} columns={columns} options={options} />
      )}
    </>
  );
};

export default ListOfStaff;
