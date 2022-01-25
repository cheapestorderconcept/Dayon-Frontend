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
      name: "ID",
    },
    {
      name: "PAYMENT TYPE",
    },
  ];
  const payments = paymentType.map((pmt) => Object.values(pmt));
  const data = [...payments];
  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Payment Methods"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default PaymentMethodList;
