import { makeNetworkCall } from "src/network";
import {
  ADD_SALES_DATA_FAIL,
  ADD_STAFF_FAIL,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  DELETE_STAFF_FAIL,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  GET_STAFF_FAIL,
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
  SUSPEND_STAFF_FAIL,
  SUSPEND_STAFF_REQUEST,
  SUSPEND_STAFF_SUCCESS,
  UPDATE_STAFF_FAIL,
  UPDATE_STAFF_REQUEST,
  UPDATE_STAFF_SUCCESS,
} from "../constants";

export const registerStaff = async ({ dispatch, staff, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_STAFF_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/register-staff",
      requestBody: staff,
    });
    console.log(data.data);
    dispatch({
      type: ADD_STAFF_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
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

export const getStaff = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_STAFF_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-staff" });
    console.log(data.data);
    dispatch({
      type: GET_STAFF_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_STAFF_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deleteStaff = async ({ dispatch, staffId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_STAFF_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `/delete-staff/${staffId}`,
    });
    dispatch({
      type: DELETE_STAFF_SUCCESS,
      payload: data.data._id,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: DELETE_STAFF_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const suspendStaff = async ({ dispatch, staffId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: SUSPEND_STAFF_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/suspend-staff/${staffId}`,
    });
    dispatch({
      type: SUSPEND_STAFF_SUCCESS,
      payload: data.data._id,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: SUSPEND_STAFF_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateStaff = async ({ dispatch, staffId, staff, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_STAFF_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-staff/${staffId}`,
      requestBody: staff,
    });

    dispatch({
      type: UPDATE_STAFF_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
        preventDuplicate: true,
      });
  } catch (error) {
    dispatch({
      type: UPDATE_STAFF_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
        preventDuplicate: true,
      });
  }
};
