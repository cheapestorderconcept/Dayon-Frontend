import { makeNetworkCall } from "src/network";
import {
  ADD_SALES_DATASUCCESS,
  ADD_SALES_DATA_FAIL,
  ADD_SALES_DATA_REQUEST,
  ADD_SALES_FAIL,
  ADD_SALES_SUCCESS,
  DELETE_SALES_FAIL,
  DELETE_SALES_REQUEST,
  DELETE_SALES_SUCCESS,
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
    dispatch({
      type: ADD_SALES_FAIL,
    });
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

    dispatch({
      type: GET_TOTAL_SALES_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
  } catch (error) {
    dispatch({
      type: GET_TOTAL_SALES_FAIL,
    });
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

    dispatch({
      type: ADD_SALES_DATASUCCESS,
      payload: data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

    Router.push({
      pathname: "/sales/reciept-print-page",
      query: { sales: JSON.stringify(sales) },
    });
  } catch (error) {
    dispatch({
      type: ADD_SALES_DATA_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deleteSales = async ({ dispatch, salesId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_SALES_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `/delete-sales/${salesId}`,
    });

    dispatch({
      type: DELETE_SALES_SUCCESS,
      payload: data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
  } catch (error) {
    dispatch({
      type: DELETE_SALES_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
