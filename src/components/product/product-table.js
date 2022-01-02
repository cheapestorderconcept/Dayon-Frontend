import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = ["SIZE", "PRODUCT NAME", "BRAND", "COST PRICE", "SUPPLIER"];

const data = [["20", "	School Bag", "Puma", "$300", "Ola"]];

const options = {
  filter: true,
  sort: true,
};

const ProductTable = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Products"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default ProductTable;
