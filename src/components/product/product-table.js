import { Button, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { deleteProduct } from "src/statesManagement/store/actions/product-action";
import { Store } from "src/statesManagement/store/store";
import NextLink from "next/link";

const ProductTable = ({ products }) => {
  const { dispatch } = useContext(Store);

  const Router = useRouter();

  const [ready, setready] = useState(false);

  useEffect(() => {
    setready(true);
  }, []);

  const columns = [
    {
      name: "ID",
    },
    {
      name: "NAME",
    },
    {
      name: "COST PRICE",
    },
    {
      name: "BARCODE",
    },
    {
      name: "CURRENT QUANTITY",
    },
    {
      name: "PREVIOUS QUANTITY",
    },
    {
      name: "BRAND NAME",
    },
  ];

  const product = products.map((pro) => Object.values(pro));

  const data = [...product];

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
  };

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Products"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default ProductTable;
