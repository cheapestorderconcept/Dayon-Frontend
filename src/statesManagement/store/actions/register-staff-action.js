import { makeNetworkCall } from "src/network";
import {
  ADD_STAFF_FAIL,
  ADD_STAFF_REQUEST,
  GET_STAFF_FAIL,
  GET_STAFF_REQUEST,
  GET_STAFF_SUCCESS,
} from "../constants";

export const registerStaff = async ({ dispatch, staff, Router }) => {
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
    Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_STAFF_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};

export const getStaff = async (dispatch) => {
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
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};
