import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const ListOfExpensesCategory = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  const columns = ["S/N", "NAME"];

  const data = [["1", "Furniture"]];

  const options = {
    filter: true,
    sort: true,
  };

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"List Of Expenses Category"}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default ListOfExpensesCategory;
