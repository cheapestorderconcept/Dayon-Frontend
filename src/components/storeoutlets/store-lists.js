import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const StoreOuletLists = ({ branch }) => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);
  const columns = [
    {
      name: "ID",
    },
    {
      name: "STORE NAME",
    },
    {
      name: "ADDRESS",
    },
    {
      name: "MANAGER/CONTACT PERSON",
    },
    {
      name: "PHONE",
    },
  ];

  const myBranch = branch.map((brch) => Object.values(brch));
  const data = [...myBranch];

  const options = {
    filter: true,
    sort: true,
  };
  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Stores"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default StoreOuletLists;
