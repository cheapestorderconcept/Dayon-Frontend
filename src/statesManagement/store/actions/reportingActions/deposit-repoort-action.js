import { makeNetworkCall } from "src/network";
import { GET_DEPOSIT_REPORT_REQUEST, GET_DEPOSIT_REPORT_SUCCESS } from "../../constants";

export const getDepositReport = async ({ dispatch, enqueueSnackbar, from, to, Router, branch }) => {
  try {
    dispatch({
      type: GET_DEPOSIT_REPORT_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/view-deposit-reports?from=${from}&to=${to}`,
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
      query: { branch, from: JSON.stringify(from), to: JSON.stringify(to) },
    });
  } catch (error) {
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
