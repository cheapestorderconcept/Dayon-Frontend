import Cookies from "js-cookie";
import { makeNetworkCall } from "src/network";
import {
  ADD_STORE_FAIL,
  ADD_STORE_REQUEST,
  ADD_STORE_SUCCESS,
  DELETE_STORE_FAIL,
  DELETE_STORE_REQUEST,
  DELETE_STORE_SUCCESS,
  GET_STORE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
} from "../constants";

export const getStores = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_STORE_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-branch" });

    dispatch({
      type: GET_STORE_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // localStorage.setItem("branch", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: GET_STORE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addStore = async ({ dispatch, store, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_STORE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/create-branch",
      requestBody: store,
    });
    dispatch({
      type: ADD_STORE_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_STORE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateStore = async ({ dispatch, storeID, store, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_STORE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-branch/${storeID}`,
      requestBody: store,
    });
    dispatch({
      type: UPDATE_STORE_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_STORE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deleteStore = async ({ dispatch, storeID, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_STORE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `/delete-branch/${storeID}`,
    });
    dispatch({
      type: DELETE_STORE_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(location.pathname);
  } catch (error) {
    dispatch({
      type: DELETE_STORE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
