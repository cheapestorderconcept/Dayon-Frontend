import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const PaymentMethodList = ({ paymentType }) => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);
  const options = {
    filter: true,
    sort: true,
    responsive: "simple",
  };

  const columns = [
    {
      name: "name",
      label: "Payment Type",
    },
  ];

  const payments = paymentType?.map((pro, i) => {
    return {
      delete: `${pro._id}`,
      Update_brand: `${pro._id}`,
      name: `${pro.payment_type}`,
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
