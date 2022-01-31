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
      name: "invoice",
      label: "Invoice Number",
    },
    {
      name: "supplier",
      label: "Suppler",
    },
    {
      name: "product",
      label: "Product",
    },

    {
      name: "purch_qty",
      label: "Purchase Quantity",
    },
    {
      name: "total_purch_val",
      label: "Total Purchase Value",
    },
    {
      name: "discount",
      label: "Discount",
    },
  ];
  // console.log(purchase);
  // const myPurchase = purchase.map((purch) => Object.values(purch));

  const myPurchase = purchase.map((purch, i) => {
    return {
      invoice: `${purch.invoice_number}`,
      supplier: `${purch.supplier}`,
      product: `${purch.product}`,
      purch_qty: `${purch.purchase_quantity}`,
      total_purch_val: `${purch.total_purchase_value}`,
      discount: `${purch.discount}`,
    };
  });

  const options = {
    filter: true,
    sort: true,
    selectableRowsHeader: false,
    responsive: "simple",
  };

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Purchases"}
          data={myPurchase}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default PurchaseList;
