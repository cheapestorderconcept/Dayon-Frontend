import { makeNetworkCall } from "src/network";
import {
  ADD_PURCHASE_FAIL,
  ADD_PURCHASE_REQUEST,
  ADD_PURCHASE_SUCCESS,
  GET_PURCHASE_FAIL,
  GET_PURCHASE_REQUEST,
  GET_PURCHASE_SUCCESS,
} from "../constants";

export const getPurchase = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_PURCHASE_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-purchase" });

    dispatch({
      type: GET_PURCHASE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PURCHASE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addPurchase = async ({ dispatch, purchase, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_PURCHASE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-purchase",
      requestBody: purchase,
    });
    console.log(data);
    dispatch({
      type: ADD_PURCHASE_SUCCESS,
      payload: data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_PURCHASE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
