import { makeNetworkCall } from "src/network";
import {
  GET_DEPOSIT_REPORT_FAIL,
  GET_DEPOSIT_REPORT_REQUEST,
  GET_DEPOSIT_REPORT_SUCCESS,
  GET_SERVICE_DEPOSIT_TRACK_FAIL,
  GET_SERVICE_DEPOSIT_TRACK_REQUEST,
  GET_SERVICE_DEPOSIT_TRACK_SUCCESS,
} from "../../constants";

export const getDepositReport = async ({ dispatch, enqueueSnackbar, from, to, Router, branch }) => {
  try {
    dispatch({
      type: GET_DEPOSIT_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/view-deposit-reports?from=${from}&to=${to}&branch=${branch}`,
    });
    console.log(data.data);
    dispatch({
      type: GET_DEPOSIT_REPORT_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    Router.push({
      pathname: "/reporting/deposit-print-report",
      query: {  from: JSON.stringify(from), to: JSON.stringify(to) },
    });
  } catch (error) {
    dispatch({
      type: GET_DEPOSIT_REPORT_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const fetchServiceDepositTrack = async ({Router, dispatch, enqueueSnackbar, query, branch }) => {
  console.log(query)
  try {
    dispatch({
      type: GET_SERVICE_DEPOSIT_TRACK_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: `fetch-deposit-track?customer_name=${query}`, target:"service" });

    dispatch({
      type: GET_SERVICE_DEPOSIT_TRACK_SUCCESS,
      payload: data.data,
    });
    console.log(data.data)
     data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });

       Router.push({
      pathname: "/reporting/service-deposit-track-print-report"
      
    });

  } catch (error) {
    dispatch({
      type: GET_SERVICE_DEPOSIT_TRACK_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};