import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const columns = [
  "Subdealer code",
  "Store Name ",
  "Phone Number",
  "Start Trading Date",
  "Stop Trading Date",
  "Status",
  "Contact Person",
  "Address",
];

const data = [
  [
    "JS/SUB73514",
    "Oni & Sons",
    "08059299184",
    "2021-12-28",
    "2022-2-14",
    "active",
    "Mr Ola",
    "44, parakin ife, osun state.",
  ],
];

const options = {
  filter: true,
  sort: true,
};

const SubdealerList = () => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"Lists Of Subdealers"}
          data={data}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default SubdealerList;
