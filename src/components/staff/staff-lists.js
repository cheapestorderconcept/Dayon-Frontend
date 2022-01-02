import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";
const columns = [" NAME", "USERNAME", "PASSWORD", "ROLE"];

const data = [["Mr Ola", "olasco", "ola123", "Super Admin"]];

const options = {
  filter: true,
  sort: true,
};

const ListOfStaff = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable title={"Lists Of Staff"} data={data} columns={columns} options={options} />
      )}
    </>
  );
};

export default ListOfStaff;
