import { makeNetworkCall } from "src/network";
import {
  ADD_STAFF_FAIL,
  ADD_STAFF_REQUEST,
  ADD_STAFF_SUCCESS,
  DELETE_STAFF_REQUEST,
  DELETE_STAFF_SUCCESS,
  GET_STAFF_FAIL,
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
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
    console.log(error);
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
