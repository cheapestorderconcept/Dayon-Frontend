import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = ["S/n", "PRODUCT SIZE", "PRODUCT NAME", "BRAND", "COST PRICE", "SUPPLIER"];

const data = [[1, "50", "School Bag", "Puma", "$300", "Ola"]];

const options = {
  filter: true,
  sort: true,
};

const ProductPriceListTable = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Product Price List"}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default ProductPriceListTable;
