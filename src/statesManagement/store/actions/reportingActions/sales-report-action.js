import { makeNetworkCall } from "src/network";
import {
  GET_SALES_REPORT_FAIL,
  GET_SALES_REPORT_REQUEST,
  GET_SALES_REPORT_SUCCESS,
} from "../../constants";

export const getSalesReport = async ({ dispatch, enqueueSnackbar, from, to, Router, branch }) => {
  try {
    dispatch({
      type: GET_SALES_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/view-sales-report?from=${from}&to=${to}&branch=${branch}`,
    });
    console.log(data.data);
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
