import { makeNetworkCall } from "src/network";
import {
  ADD_PAYMENT_TYPE_FAIL,
  ADD_PAYMENT_TYPE_REQUEST,
  ADD_PAYMENT_TYPE_SUCCESS,
  DELETE_PAYMENT_TYPE_FAIL,
  DELETE_PAYMENT_TYPE_REQUEST,
  DELETE_PAYMENT_TYPE_SUCCESS,
  GET_PAYMENT_TYPE_FAIL,
  GET_PAYMENT_TYPE_REQUEST,
  GET_PAYMENT_TYPE_SUCCESS,
} from "../constants/index";

export const getPaymentMethod = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_PAYMENT_TYPE_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-payment-type" });
    console.log(data.data);
    dispatch({
      type: GET_PAYMENT_TYPE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAYMENT_TYPE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addPaymentMethod = async ({ dispatch, method, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_PAYMENT_TYPE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-payment-type",
      requestBody: method,
    });
    dispatch({
      type: ADD_PAYMENT_TYPE_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_PAYMENT_TYPE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deletePaymentMethod = async ({ dispatch, methodId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_PAYMENT_TYPE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `delete-payment-type/${methodId}`,
    });
    dispatch({
      type: DELETE_PAYMENT_TYPE_SUCCESS,
      payload: data.data._id,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    console.log(data.data);
    Router.reload(window.location.pathname);
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_PAYMENT_TYPE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

// export const updatePaymentMethod = async ({ dispatch, methodId, supId, Router }) => {
//   try {
//     dispatch({
//       type: UPDATE_SUPPLIER_REQUEST,
//     });

//     const { data } = await makeNetworkCall({
//       method: "PUT",
//       path: `/update-payment/${methodId}`,
//       requestBody: supplier,
//     });
//     console.log(data);
//     dispatch({
//       type: UPDATE_SUPPLIERS_SUCCESS,
//       payload: data.data,
//     });
//     Router.reload(window.location.pathname);
//   } catch (error) {
//     dispatch({
//       type: UPDATE_SUPPLIERS_FAIL,
//       payload: error?.response?.data?.response_message || error.message,
//     });
//   }
// };
