import { makeNetworkCall } from "src/network";
import {
  ADD_SERVICE_CATEGORY_FAIL,
  ADD_SERVICE_CATEGORY_REQUEST,
  ADD_SERVICE_CATEGORY_SUCCESS, ADD_SERVICE_DEPOSIT_FAIL, ADD_SERVICE_DEPOSIT_REQUEST, ADD_SERVICE_DEPOSIT_SUCCESS, ADD_SERVICE_FAIL, ADD_SERVICE_PAYMENT_FAIL, ADD_SERVICE_PAYMENT_REQUEST,
  ADD_SERVICE_PAYMENT_SUCCESS, ADD_SERVICE_REQUEST, ADD_SERVICE_SUCCESS, DELETE_SERVICE_CATEGORY_FAIL,
  DELETE_SERVICE_CATEGORY_REQUEST,
  DELETE_SERVICE_CATEGORY_SUCCESS, DELETE_SERVICE_DEPOSIT_FAIL, DELETE_SERVICE_DEPOSIT_REQUEST, DELETE_SERVICE_DEPOSIT_SUCCESS, DELETE_SERVICE_FAIL, DELETE_SERVICE_REQUEST, DELETE_SERVICE_SUCCESS, GET_SERVICE_CATEGORIES_FAIL, GET_SERVICE_CATEGORIES_REQUEST, GET_SERVICE_CATEGORIES_SUCCESS, GET_SERVICE_DEPOSIT_FAIL, GET_SERVICE_DEPOSIT_REQUEST, GET_SERVICE_DEPOSIT_SUCCESS, GET_SERVICE_DEPOSIT_TRACK_FAIL, GET_SERVICE_DEPOSIT_TRACK_REQUEST, GET_SERVICE_DEPOSIT_TRACK_SUCCESS, GET_SERVICE_FAIL, GET_SERVICE_PAYMENT_REQUEST, GET_SERVICE_PAYMENT_SUCCESS, GET_SERVICE_REQUEST, GET_SERVICE_SUCCESS, UPDATE_SERVICE_CATEGORY_FAIL, UPDATE_SERVICE_CATEGORY_REQUEST, UPDATE_SERVICE_CATEGORY_SUCCESS, UPDATE_SERVICE_DEPOSIT_FAIL, UPDATE_SERVICE_DEPOSIT_REQUEST, UPDATE_SERVICE_DEPOSIT_SUCCESS, UPDATE_SERVICE_FAIL, UPDATE_SERVICE_REQUEST, UPDATE_SERVICE_SUCCESS
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

export const getService = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_SERVICE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: "fetch-services",
      target: "service",
    });

    dispatch({
      type: GET_SERVICE_SUCCESS,
      payload: data.data.services,
    });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addService = async ({ dispatch, service, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_SERVICE_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "POST",
      path: "add-service",
      requestBody: service,
      target: "service",
    });
    console.log(data.data);
    dispatch({
      type: ADD_SERVICE_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_SERVICE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateService = async ({ dispatch, service, serviceId, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_SERVICE_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `update-service/${serviceId}`,
      target: "service",
      requestBody: service,
    });

    dispatch({
      type: UPDATE_SERVICE_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_SERVICE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deleteService = async ({ dispatch, serviceId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_SERVICE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `delete-service/${serviceId}`,
      target: "service",
    });
    dispatch({
      type: DELETE_SERVICE_SUCCESS,
      payload: data.data._id,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: DELETE_SERVICE_FAIL,
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
     Router.push({
      pathname: "/services/service-payment/reciept-print-page",
      query: { service: JSON.stringify(service) },
    });
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


export const addServiceDeposit = async ({ dispatch, deposit, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_SERVICE_DEPOSIT_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "POST",
      path: "add-deposit", 
      requestBody: deposit,
      target:"service"
    });
    console.log(data.data);
    dispatch({
      type: ADD_SERVICE_DEPOSIT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_SERVICE_DEPOSIT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const getServiceDeposit = async ({ dispatch, enqueueSnackbar }) => {
  
  try {
    dispatch({
      type: GET_SERVICE_DEPOSIT_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "fetch-deposit", target:"service" });

    dispatch({
      type: GET_SERVICE_DEPOSIT_SUCCESS,
      payload: data.data,
    });
    console.log(data.data)
     data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

  } catch (error) {
    dispatch({
      type: GET_SERVICE_DEPOSIT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateServiceDeposit = async ({ dispatch, deposit, depId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_SERVICE_DEPOSIT_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `update-deposit-payment?depositId=${depId}`, 
      target:"service",
      requestBody: deposit,
    });

    dispatch({
      type: UPDATE_SERVICE_DEPOSIT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_SERVICE_DEPOSIT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deleteServiceDeposit = async ({ dispatch, depId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_SERVICE_DEPOSIT_REQUEST,
    });
    const { data } = await makeNetworkCall({

      method: "DELETE",
      path: `delete-a-service-deposit/${depId}`,// confirm path
      target:"service"
    });
    dispatch({
      type: DELETE_SERVICE_DEPOSIT_SUCCESS,
      payload: data.data._id,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: DELETE_SERVICE_DEPOSIT_FAIL,
    });

    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};


