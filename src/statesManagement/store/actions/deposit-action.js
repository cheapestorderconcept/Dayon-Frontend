import { makeNetworkCall } from "src/network";
import {
  ADD_DEPOSIT_FAIL,
  ADD_DEPOSIT_REQUEST,
  ADD_DEPOSIT_SUCCESS,
  GET_TOTAL_DEPOSIT_FAIL,
  GET_TOTAL_DEPOSIT_REQUEST,
  GET_TOTAL_DEPOSIT_SUCCESS,
  UPDATE_DEPOSIT_FAIL,
  UPDATE_DEPOSIT_REQUEST,
  UPDATE_DEPOSIT_SUCCESS,
} from "../constants";

export const getTotalDeposit = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_TOTAL_DEPOSIT_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-deposit" });

    dispatch({
      type: GET_TOTAL_DEPOSIT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
        preventDuplicate: true,
      });
  } catch (error) {
    dispatch({
      type: GET_TOTAL_DEPOSIT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
        preventDuplicate: true,
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

    dispatch({
      type: ADD_DEPOSIT_SUCCESS,
      payload: data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
        preventDuplicate: true,
      });

    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_DEPOSIT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
        preventDuplicate: true,
      });
  }
};

export const updateDeposit = async ({ dispatch, depId, deposit, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_DEPOSIT_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-deposit/${depId}`,
      requestBody: deposit,
    });

    dispatch({
      type: UPDATE_DEPOSIT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
        preventDuplicate: true,
      });
  } catch (error) {
    dispatch({
      type: UPDATE_DEPOSIT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
        preventDuplicate: true,
      });
  }
};
