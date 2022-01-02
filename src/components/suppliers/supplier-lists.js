import MUIDataTable from "mui-datatables";

import { useEffect, useState } from "react";

const columns = [" NAME", "PHONE", "EMAIL", "CONTACT PERSON"];

const data = [["Mr Ola", "08023456789", "ola@email.com", "Mr Ayo"]];

const options = {
  filter: true,
  sort: true,
};

const SuppliersList = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Suppliers"}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default SuppliersList;
