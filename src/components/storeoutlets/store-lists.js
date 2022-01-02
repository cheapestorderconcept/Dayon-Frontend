import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = ["STORE NAME", "CONTACT PERSON", "PHONE", "ADDRESS"];

const data = [["Headquarters Parakin", "	MR. Ayo", "08023456789", "Parakin Junction, Il"]];

const options = {
  filter: true,
  sort: true,
};

const StoreOuletLists = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Stores"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default StoreOuletLists;
