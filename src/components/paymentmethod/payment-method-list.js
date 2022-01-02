import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = ["METHOD NAME"];

const data = [["POS"], ["CASH"], ["ATM"], ["BANK TRANSFER"], ["CHEQUE"]];

const options = {
  filter: true,
  sort: true,
};

const PaymentMethodList = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Payment Methods"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default PaymentMethodList;
