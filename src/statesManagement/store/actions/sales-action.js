import { makeNetworkCall } from "src/network";
import {
  ADD_SALES_DATASUCCESS,
  ADD_SALES_DATA_FAIL,
  ADD_SALES_DATA_REQUEST,
  ADD_SALES_FAIL,
  ADD_SALES_SUCCESS,
  GET_TOTAL_SALES_FAIL,
  GET_TOTAL_SALES_REQUEST,
  GET_TOTAL_SALES_SUCCESS,
} from "../constants";

export const addSales = async ({ dispatch, sales, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_SALES_SUCCESS,
      payload: { ...sales },
    });
  } catch (error) {
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const getTotalSales = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_TOTAL_SALES_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-sales" });
    console.log(data.data);
    dispatch({
      type: GET_TOTAL_SALES_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
  } catch (error) {
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addSalesData = async ({ dispatch, sales, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_SALES_DATA_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-sales",
      requestBody: sales,
    });
    console.log(data);
    dispatch({
      type: ADD_SALES_DATASUCCESS,
      payload: data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

    // Router.reload(window.location.pathname);
  } catch (error) {
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
