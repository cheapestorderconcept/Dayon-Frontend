import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { deletePaymentMethod } from "src/statesManagement/store/actions/payment-type-action";
import { Store } from "src/statesManagement/store/store";

const PaymentMethodList = ({ paymentType }) => {
  const [ready, setready] = useState(false);
  const { dispatch } = useContext(Store);

  const Router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setready(true);
  }, []);
  const options = {
    filter: true,
    sort: true,
    responsive: "simple",
  };

  const handleDelete = (tableMeta) => (e) => {
    const validate = confirm("Are you sure you want to delete");
    if (!!validate) {
      const methodId = tableMeta?.rowData[0];
      deletePaymentMethod({
        dispatch: dispatch,
        methodId: methodId,
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
      name: "name",
      label: "Payment Type",
    },
  ];

  const payments = paymentType?.map((type, i) => {
    return {
      delete: `${type._id}`,
      Update_brand: `${type._id}`,
      name: `${type.payment_type}`,
    };
  });

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Payment Methods"}
          data={payments}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default PaymentMethodList;
