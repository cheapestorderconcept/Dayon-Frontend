import { makeNetworkCall } from "src/network";
import {
  ADD_DEPOSIT_REQUEST,
  ADD_DEPOSIT_SUCCESS,
  GET_TOTAL_DEPOSIT_REQUEST,
  GET_TOTAL_DEPOSIT_SUCCESS,
  UPDATE_DEPOSIT_REQUEST,
  UPDATE_DEPOSIT_SUCCESS,
} from "../constants";

export const getTotalDeposit = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_TOTAL_DEPOSIT_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-deposit" });
    console.log(data.data);
    dispatch({
      type: GET_TOTAL_DEPOSIT_SUCCESS,
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

export const addDepositData = async ({ dispatch, deposit, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_DEPOSIT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-deposit",
      requestBody: deposit,
    });
    console.log(data);
    dispatch({
      type: ADD_DEPOSIT_SUCCESS,
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

export const updateDeposit = async ({ dispatch, depId, price, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_DEPOSIT_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-deposit/${depId}`,
      requestBody: price,
    });
    console.log(data);
    dispatch({
      type: UPDATE_DEPOSIT_SUCCESS,
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
