import { makeNetworkCall } from "src/network";
import {
  ADD_SUPPLIERS_REQUEST,
  ADD_SUPPLIERS_SUCCESS,
  ADD_SUPPLIERS_FAIL,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_FAIL,
  GET_SUPPLIERS_REQUEST,
  DELETE_SUPPLIERS_REQUEST,
  DELETE_SUPPLIERS_SUCCESS,
  DELETE_SUPPLIERS_FAIL,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIERS_SUCCESS,
  UPDATE_SUPPLIERS_FAIL,
} from "../constants/index";

export const getSuppliers = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_SUPPLIERS_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-supplier" });
    console.log(data.data);
    dispatch({
      type: GET_SUPPLIERS_SUCCESS,
      payload: data.data.supplier,
    });
  } catch (error) {
    dispatch({
      type: GET_SUPPLIERS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addSupplier = async ({ dispatch, supplier, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_SUPPLIERS_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-supplier",
      requestBody: supplier,
    });
    dispatch({
      type: ADD_SUPPLIERS_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_SUPPLIERS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deleteSupplier = async ({ dispatch, supId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_SUPPLIERS_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `/delete-supplier/${supId}`,
    });
    dispatch({
      type: DELETE_SUPPLIERS_SUCCESS,
      payload: data.data._id,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: DELETE_SUPPLIERS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateSupplier = async ({ dispatch, supplier, supId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_SUPPLIER_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-supplier/${supId}`,
      requestBody: supplier,
    });
    console.log(data);
    dispatch({
      type: UPDATE_SUPPLIERS_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_SUPPLIERS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
