import { makeNetworkCall } from "src/network";
import {
  GET_SERVICE_PAYMENT_REPORT_FAIL,
  GET_SERVICE_PAYMENT_REPORT_REQUEST,
  GET_SERVICE_PAYMENT_REPORT_SUCCESS,
  GET_SERVICE_DEPOSIT_BY_CATEGORY_REPORT_REQUEST,
  GET_SERVICE_DEPOSIT_BY_CATEGORY_REPORT_SUCCESS,
  GET_SERVICE_DEPOSIT_BY_CATEGORY_REPORT_FAIL,
  GET_SERVICE_PAYMENT_BY_CATEGORY_REPORT_REQUEST,
  GET_SERVICE_PAYMENT_BY_CATEGORY_REPORT_SUCCESS,
  GET_SERVICE_PAYMENT_BY_CATEGORY_REPORT_FAIL,
  GET_SERVICE_DEPOSIT_REPORT_REQUEST,
  GET_SERVICE_DEPOSIT_REPORT_SUCCESS,
  GET_SERVICE_DEPOSIT_REPORT_FAIL,
} from "../../constants";

export const getServiceReports = async ({
  dispatch,
  enqueueSnackbar,
  from,
  to,
  Router,
  branch,
}) => {

  try {
    dispatch({
      type: GET_SERVICE_PAYMENT_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `payment-report?from=${from}&to=${to}`,

      target: "service",

    });
  
    dispatch({
      type: GET_SERVICE_PAYMENT_REPORT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

    Router.push({
      pathname: "/reporting/service-payment-print-report",
      query: { branch, from: JSON.stringify(from), to: JSON.stringify(to) },
    });

  } catch (error) {
    dispatch({
      type: GET_SERVICE_PAYMENT_REPORT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const getServiceDepositReports = async ({
  dispatch,
  enqueueSnackbar,
  from,
  to,
  Router,
  branch,
}) => {
  try {
    dispatch({
      type: GET_SERVICE_DEPOSIT_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `deposit-report?from=${from}&to=${to}`,

      target: "service",

    });
  
    dispatch({
      type: GET_SERVICE_DEPOSIT_REPORT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

    Router.push({
      pathname: "/reporting/service-deposit-print-report",
      query: { branch, from: JSON.stringify(from), to: JSON.stringify(to) },
    });

  } catch (error) {
    dispatch({
      type: GET_SERVICE_DEPOSIT_REPORT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};


export const getServiceByCategoryReports = async ({
  dispatch,
  enqueueSnackbar,
  from,
  to,
  Router,
  query,
  branch,
}) => {

  try {
    dispatch({
      type: GET_SERVICE_PAYMENT_BY_CATEGORY_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `fetch-payment-by-categories?from=${from}&to=${to}&categories=${query}`,

      target: "service",

    });
    console.log(data.data);
    dispatch({
      type: GET_SERVICE_PAYMENT_BY_CATEGORY_REPORT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    Router.push({
      pathname: "/reporting/service-payment-by-category-print-report",
      query: { branch, from: JSON.stringify(from), to: JSON.stringify(to) },
    });

  } catch (error) {
    dispatch({
      type: GET_SERVICE_PAYMENT_BY_CATEGORY_REPORT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};


export const getServiceDepositByCategoryReports = async ({
  dispatch,
  enqueueSnackbar,
  from,
  to,
  Router,
  query,
  branch,
}) => {

  try {
    dispatch({
      type: GET_SERVICE_DEPOSIT_BY_CATEGORY_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `deposit-report-by-categories?from=${from}&to=${to}&categories=${query}`,

      target: "service",

    });
    console.log(data.data);
    dispatch({
      type: GET_SERVICE_DEPOSIT_BY_CATEGORY_REPORT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

    Router.push({
      pathname: "/reporting/service-deposit-by-category-print-report",
      query: { branch, from: JSON.stringify(from), to: JSON.stringify(to) },
    });

  } catch (error) {
    dispatch({
      type: GET_SERVICE_DEPOSIT_BY_CATEGORY_REPORT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }

};

