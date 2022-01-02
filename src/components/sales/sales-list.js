import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = [
  "DATE",
  "INVOICE #",
  "STORE",
  "PRODUCT",
  "QUANTITY",
  "SELLING PRICE",
  "	PAYMENT TYPE",
  "AMOUNT",
];

const data = [
  ["2021-12-28", "	000001", "	Headquarters Parakin", "Books", "5", "N500", "POS", "N300"],
];

const options = {
  filter: true,
  sort: true,
};

const SalesList = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Purchases"}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default SalesList;
