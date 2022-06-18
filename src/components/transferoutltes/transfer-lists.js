import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = ["DATE", "INVOICE #", "FROM STORE", "TO STORE", "	PRODUCT", "QUANTITY"];

const data = [["2021-12-28", "000003", "OSOGBO BRANCH", "EDE BRANCH", "LAPTOP", "2"]];

const options = {
  filter: true,
  sort: true,
};

const TransferList = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Transfers"}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default TransferList;
