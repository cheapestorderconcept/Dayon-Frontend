import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = ["DATE", "INVOICE #", "STORE", "SUPPLIER", "TOTAL VALUE"];

const data = [["2021-12-28", "	000001", "	Headquarters Parakin", "Amodu Olaoye", "3"]];

const options = {
  filter: true,
  sort: true,
};

const SupplierLedgerList = () => {
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

export default SupplierLedgerList;
