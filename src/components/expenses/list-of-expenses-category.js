import MUIDataTable from "mui-datatables";
import { useEffect, useState } from "react";

const ListOfExpensesCategory = ({ expensesCategories }) => {
  const [ready, setready] = useState(false);
  useEffect(() => {
    setready(true);
  }, []);
  const editColums = [
    // {
    //   name: "Delete",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Button onClick={handleDelete(tableMeta)} variant="contained" color="error">
    //           <NextLink
    //             href={`/expenses/${tableMeta.rowData[2]}`}
    //             style={{ textDecoration: "none", color: "white" }}
    //           >
    //             <Typography variant="body1" color="inherit">
    //               Delete
    //             </Typography>
    //           </NextLink>
    //         </Button>
    //       );
    //     },
    //   },
    // },
    // {
    //   name: "Edit",
    //   options: {
    //     filter: true,
    //     sort: false,
    //     empty: true,
    //     customBodyRender: (value, tableMeta, updateValue) => {
    //       return (
    //         <Button variant="contained">
    //           <NextLink
    //             href={`/expenses/${tableMeta.rowData[2]}`}
    //             style={{ textDecoration: "none", color: "white" }}
    //           >
    //             <Typography variant="body1" color="inherit">
    //               Edit
    //             </Typography>
    //           </NextLink>
    //         </Button>
    //       );
    //     },
    //   },
    // },
    {
      name: "ID",
    },
    {
      name: "NAME",
    },
    {
      name: "ADDRESS",
    },
    {
      name: "PHONE",
    },
    {
      name: "EMAIL",
    },
    {
      name: "CONTACT PERSON",
    },
  ];
  const colums = [{ name: "name", label: "CATEGORY NAME" }];

  const options = {
    filter: true,
    sort: true,
    responsive: "simple",
  };

  // const exp = expensesCategories.map((exp) => Object.values(exp));
  console.log(expensesCategories);
  const exp = expensesCategories.map((exp, i) => {
    return {
      name: `${exp.expenses_category}`,
    };
  });

  return (
    <>
      {ready == true && (
        <MUIDataTable
          title={"List Of Expenses Category"}
          data={exp}
          columns={colums}
          options={options}
        />
      )}
    </>
  );
};

export default ListOfExpensesCategory;
