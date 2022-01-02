import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = ["BRAND NAME"];

const data = [["Puma"]];

const options = {
  filter: true,
  sort: true,
};

const BrandTable = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Brands"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default BrandTable;
