
import MUIDataTable from "mui-datatables";
import {  useEffect, useState } from "react";

const DepositHistory = ({ customerDeposits }) => {
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
      name: "customer",
      label: "Customer Name",
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
      name: "total_amount",
      label: "Total Amount",
    },
      {
      name: "quantity",
      label: "Quantity",
    },
      {
      name: "amount_deposited",
      label: "Amount Deposited",
    },
         {
      name: "amount_to_balance",
      label: "Amount To balance",
    },
      {
      name: "payment_type",
      label: "Payment Type",
    },
       {
      name: "branch",
      label: "Store Branch",
    }
     

  ];
 
 const myDeposit = customerDeposits?.customerDeposit?.map((dep)=>{
  console.log(dep.product);
const strDate = new Date(dep?.created_at);
   function convert(strDate) {
      var date = new Date(strDate),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
   return{
      date: `${convert(strDate)}`,
      serial_num:`${dep?.serial_number}`,
      invoice:`${dep?.invoice_number}`,
      product: `${dep?.product}`,
      cost_price: `${dep?.cost_price}`,
      selling_price:`${dep?.selling_price}`,
      total_amount:`${dep?.total_amount}`,
      quantity:`${dep?.quantity}`,
      payment_type:`${dep?.payment_type}`,
      branch:`${dep?.branch}`,
       amount_deposited:`${dep?.amount_deposited}`,
        amount_to_balance:`${dep?.amount_to_balance}`,
         barcode:`${dep?.barcode}`,
          customer:`${dep?.customer_name}`,
   }
  })
     
  console.log(myDeposit);

  

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
          title={"Customer's Deposits"}
          data={myDeposit}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default DepositHistory;
