import React, { useContext, useEffect, useState } from "react";
import HouseIcon from "@mui/icons-material/House";
import SaveIcon from "@mui/icons-material/Save";
import { makeStyles } from "@mui/styles";
import { IconButton, Typography } from "@mui/material";
import { CustomSelect } from "./basicInputs";
import { Formik, Form } from "formik";
import { Store } from "src/statesManagement/store/store";
import { getStores } from "src/statesManagement/store/actions/store-outlet-action";
import { stores } from "src/__mocks__/stores";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  address_bar_wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#F2DEDE",
    marginBottom: "20px",
    padding: "10px",
  },
  form: {
    display: "flex",
    justifyContent: "space-between",
  },
  left_items_icon: {
    marginRight: "10px",
  },

  right_items_icon: {
    margin: "0 10px",
  },
}));

const BranchIndicator = () => {
  const classes = useStyles();
  const { state } = useContext(Store);
  const { branch } = state;

  const Router = useRouter();
  const INIITAL_VALUE = {
    branchName: "",
  };

  const handleSubmit = (values, e) => {
    if (Cookies.get("selectedBranch")) {
      Cookies.remove("selectedBranch");
      Cookies.set("selectedBranch", values.branchName);
      Router.reload(location.pathname);
    } else {
      Cookies.set("selectedBranch", values.branchName);
      Router.reload(location.pathname);
    }
  };
  return (
    <div className={classes.address_bar_wrapper}>
      <div className={classes.left_items}>
        <span className={classes.left_items_icon}>
          <HouseIcon />
        </span>
        <Typography>You are currently logged into: {Cookies.get("selectedBranch")}</Typography>
      </div>
      <div>
        <Formik initialValues={{ ...INIITAL_VALUE }} onSubmit={handleSubmit}>
          {({ errors, values, handleChange, setValues }) => (
            <Form className={classes.form}>
              <CustomSelect label="Select branch" name="branchName" options={branch} />
              <IconButton onClick={(e) => handleSubmit(values, e)}>
                <SaveIcon />
              </IconButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default BranchIndicator;
