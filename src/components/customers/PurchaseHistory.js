
import MUIDataTable from "mui-datatables";
import {  useEffect, useState } from "react";

const PurchaseHistory = ({ customerPurchased }) => {

  const [ready, setready] = useState(false);
  

  useEffect(() =>  {
    setready(true);
  
  }, []);

  const columns = [
   
    {
      name: "date",
      label: "Date",
    },
    {
      name: "serial_num",
      label: "Serial Number",
    },
    {
      name: "invoice",
      label: "Invoice",
    },
     {
      name: "product",
      label: "Product Name",
    },
     {
      name: "barcode",
      label: "Product Barcode",
    },
     {
      name: "cost_price",
      label: "Cost Price",
    },
     {
      name: "selling_price",
      label: "Selling Price",
    },
      {
      name: "amount",
      label: "Amount",
    },
      {
      name: "quantity",
      label: "Quantity",
    },
      {
      name: "payment_type",
      label: "Payment Type",
    },
       {
      name: "branch",
      label: "Store Branch",
    },

  ];
 

  const myPurchase = customerPurchased?.customerPurchased?.map((purch)=>{
const strDate = new Date(purch?.created_at);
   function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
   return{
      date: `${convert(strDate)}`,
      serial_num:`${purch?.serial_number}`,
      invoice:`${purch?.invoice_number}`,
      product: `${purch?.product}`,
      cost_price: `${purch?.cost_price}`,
      selling_price:`${purch?.selling_price}`,
      amount:`${purch?.amount}`,
      quantity:`${purch?.quantity}`,
      payment_type:`${purch?.payment_type}`,
      barcode:`${purch?.barcode}`,
      branch:`${purch?.branch}`,
   }
  })
     
      

  
  

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
          title={"Customer's Transactions"}
          data={myPurchase}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default PurchaseHistory;
