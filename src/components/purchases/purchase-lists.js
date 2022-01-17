import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

// const columns = [
//   "DATE",
//   "INVOICE #",
//   "STORE",
//   "SUPPLIER",
//   "VAT",
//   "DISCOUNT",
//   "	PURCHASE VALUE",
//   "ITEMS",
// ];

// const data = [
//   ["2021-12-28", "	000001", "	Headquarters Parakin", "Amodu Olaoye", "---", "20%", "N500", "3"],
// ];

// const options = {
//   filter: true,
//   sort: true,
// };

const PurchaseList = ({ purchase }) => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  const columns = [
    {
      name: "ID",
    },
    {
      name: "DATE",
    },
    // {
    //   name: "DATE",
    // },
  ];

  const myPurchase = purchase.map((purch) => Object.values(purch));
  console.log(myPurchase);
  const myArray = [];
  myPurchase.map((purch) => console.log(purch[2].branch_name));

  const data = [...myPurchase];

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
  };

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

export default PurchaseList;
