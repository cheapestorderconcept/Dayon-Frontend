import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = [
  "DATE",
  "INVOICE #",
  "AMOUNT DEPOSITED",
  "CUSTOMER NAME",
  "PHONE",
  "	PRODUCT",
  "QUANTITY",
  "PRICE PER UNIT",
];

const data = [
  ["2021-12-28", "000002", "N200,000", "ONI & SONS", "08059299184", "LAPTOP", "2", "N100,000"],
];

const options = {
  filter: true,
  sort: true,
};

const DepositList = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Deposits"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default DepositList;
