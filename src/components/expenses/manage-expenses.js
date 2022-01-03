import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = ["EXPENSES DETAILS", "AMOUNT", "APPROVED BY", "DATE"];

const data = [["Car Maintenance", "N5,000", "Dayon Consult", "2022-03-01"]];

const options = {
  filter: true,
  sort: true,
};

const ManageExpenses = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Expenses"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default ManageExpenses;
