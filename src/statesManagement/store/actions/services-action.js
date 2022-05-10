import { makeNetworkCall } from "src/network";
import {
    ADD_SERVICE_CATEGORY_FAIL,
    ADD_SERVICE_CATEGORY_REQUEST,
    ADD_SERVICE_CATEGORY_SUCCESS,
    ADD_SERVICE_PAYMENT_REQUEST,
    ADD_SERVICE_PAYMENT_SUCCESS,
    ADD_SERVICE_PAYMENT_FAIL,

 DELETE_SERVICE_CATEGORY_FAIL,
 DELETE_SERVICE_CATEGORY_REQUEST,
 DELETE_SERVICE_CATEGORY_SUCCESS,
 GET_SERVICE_CATEGORIES_FAIL, GET_SERVICE_CATEGORIES_REQUEST, GET_SERVICE_CATEGORIES_SUCCESS, UPDATE_SERVICE_CATEGORY_FAIL, UPDATE_SERVICE_CATEGORY_REQUEST, UPDATE_SERVICE_CATEGORY_SUCCESS, GET_SERVICE_PAYMENT_REQUEST, GET_SERVICE_PAYMENT_SUCCESS, GET_SERVICE_PAYMENT_FAIL

} from "../constants/index";

export const getServiceCategories = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_SERVICE_CATEGORIES_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "fetch-all-categories", target:"service" });

    dispatch({
      type: GET_SERVICE_CATEGORIES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_CATEGORIES_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addServiceCategory = async ({ dispatch, category, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_SERVICE_CATEGORY_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "POST",
      path: "add-service-categories",
      requestBody: category,
      target:"service"
    });
    console.log(data.data);
    dispatch({
      type: ADD_SERVICE_CATEGORY_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_SERVICE_CATEGORY_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};



export const deleteServiceCategory = async ({ dispatch, categoryId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_SERVICE_CATEGORY_REQUEST,
    });
    const { data } = await makeNetworkCall({

      method: "DELETE",
      path: `delete-a-category/${categoryId}`,
      target:"service"
    });
    dispatch({
      type: DELETE_SERVICE_CATEGORY_SUCCESS,
      payload: data.data._id,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: DELETE_SERVICE_CATEGORY_FAIL,
    });

    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateServiceCategory = async ({ dispatch, category, categoryId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_SERVICE_CATEGORY_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `update-category/${categoryId}`,
      target:"service",
      requestBody: category,
    });

    dispatch({
      type: UPDATE_SERVICE_CATEGORY_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_SERVICE_CATEGORY_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};


// Continue Other Services Actions from here...

export const addServicePayment = async ({ dispatch, service, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_SERVICE_PAYMENT_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "POST",
      path: "add-payment",
      requestBody: service,
      target:"service"
    });
    console.log(data.data);
    dispatch({
      type: ADD_SERVICE_PAYMENT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_SERVICE_PAYMENT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
export const getServicePayments = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_SERVICE_PAYMENT_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "fetch-all-categories", target:"service" });

    dispatch({
      type: GET_SERVICE_PAYMENT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_PAYMENT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};