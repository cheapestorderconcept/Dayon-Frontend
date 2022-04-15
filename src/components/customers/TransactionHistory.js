
import MUIDataTable from "mui-datatables";
import {  useEffect, useState } from "react";

const TransactionHistory = ({ customerTransactions }) => {
 
  const [ready, setready] = useState(false);
  

  useEffect(() =>  {
    setready(true);
  
  }, []);

  const columns = [
   
    {
      name: "net_balance",
      label: "Net Balance",
    },
    {
      name: "total_amount_paid",
      label: "Total Amount Paid",
    },
    {
      name: "total_purchased",
      label: "Total Purchased",
    },

  ];
 

  const myTransactions = [{
     
      net_balance: `${customerTransactions.net_balance}`,
      total_amount_paid: `${customerTransactions.total_amount_paid}`,
      total_purchased: `${customerTransactions.total_purchased}`,
     
    }];
  

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
          data={myTransactions}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default TransactionHistory;
