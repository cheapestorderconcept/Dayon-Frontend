import React, { useContext, useEffect } from "react";
import HouseIcon from "@mui/icons-material/House";
import SaveIcon from "@mui/icons-material/Save";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { CustomSelect } from "./basicInputs";
import { Formik, Form } from "formik";
import { Store } from "src/statesManagement/store/store";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { stores } from "src/__mocks__/stores";

const INIITAL_VALUE = {
  branchName: "",
};

const useStyles = makeStyles((theme) => ({
  address_bar_wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#F2DEDE",
    marginBottom: "20px",
    padding: "10px",
  },
  left_items: {
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
  },
  left_items_icon: {
    marginRight: "10px",
  },
  right_items: {
    display: "flex",
    alignItems: "center",
    padding: "0 10px",
  },
  right_items_icon: {
    margin: "0 10px",
  },
}));

const BranchIndicator = () => {
  const classes = useStyles();
  const { state } = useContext(Store);
  const { branch } = state;
  return (
    <div className={classes.address_bar_wrapper}>
      <div className={classes.left_items}>
        <span className={classes.left_items_icon}>
          <HouseIcon />
        </span>
        <Typography>You are currently logged into: {branch[0].branch_name || ""}</Typography>
      </div>
      <div className={classes.right_items}>
        <Formik initialValues={{ ...INIITAL_VALUE }}>
          <Form>
            <CustomSelect label="Select branch" name="branchName" options={branch} />
          </Form>
        </Formik>

        <span className={classes.right_items_icon}>
          <SaveIcon />
        </span>
      </div>
    </div>
  );
};
export default BranchIndicator;
