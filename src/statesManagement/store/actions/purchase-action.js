import { makeNetworkCall } from "src/network";
import {
  ADD_PURCHASE_FAIL,
  ADD_PURCHASE_REQUEST,
  ADD_PURCHASE_SUCCESS,
  DELETE_PURCHASE_FAIL,
  DELETE_PURCHASE_REQUEST,
  DELETE_PURCHASE_SUCCESS,
  GET_PURCHASE_FAIL,
  GET_PURCHASE_REQUEST,
  GET_PURCHASE_SUCCESS,
  UPDATE_PURCHASE_FAIL,
  UPDATE_PURCHASE_REQUEST,
  UPDATE_PURCHASE_SUCCESS,
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
export const updatePurchase = async ({ dispatch, purchase, purchId, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_PURCHASE_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-purchase/${purchId}`,
      requestBody: purchase,
    });
    console.log(data);
    dispatch({
      type: UPDATE_PURCHASE_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_PURCHASE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deletePurchase = async ({ dispatch, purchId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_PURCHASE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `/delete-purchase/${purchId}`,
    });
    dispatch({
      type: DELETE_PURCHASE_SUCCESS,
      payload: data.data._id,
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
    dispatch({
      type: DELETE_PURCHASE_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};
