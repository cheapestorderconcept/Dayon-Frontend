import { makeNetworkCall } from "src/network";
import {
  GET_RECEIPT_REPRINT_FAIL,
  GET_RECEIPT_REPRINT_REQUEST,
  GET_RECEIPT_REPRINT_SUCCESS,
  GET_SALES_REPORT_FAIL,
  GET_SALES_REPORT_REQUEST,
  GET_SALES_REPORT_SUCCESS,
} from "../../constants";

export const getSalesReport = async ({
  dispatch,
  enqueueSnackbar,
  from,
  to,
  Router,
  branch,
  payment_type,
}) => {
  try {
    dispatch({
      type: GET_SALES_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/view-sales-report?from=${from}&to=${to}&branch=${branch}`,
    });
    console.log(data);
    dispatch({
      type: GET_SALES_REPORT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    Router.push({
      pathname: "/reporting/sales-print-report",
      query: { branch, from: JSON.stringify(from), to: JSON.stringify(to) },
    });
  } catch (error) {
    dispatch({
      type: GET_SALES_REPORT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const getReprintReciept = async ({ dispatch, enqueueSnackbar, Router, invoice_num }) => {
  try {
    dispatch({
      type: GET_RECEIPT_REPRINT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `reprint-sales-receipt?invoiceNumber=${invoice_num}`,
    });
    console.log(data.data);
    dispatch({
      type: GET_RECEIPT_REPRINT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    Router.push({
      pathname: "/sales/reciept-re-print-page",
      query: { receipts: JSON.stringify(data?.data) },
    });
  } catch (error) {
    dispatch({
      type: GET_RECEIPT_REPRINT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
