import { makeNetworkCall } from "src/network";
import { ADD_SALES_FAIL, ADD_SALES_REQUEST, ADD_SALES_SUCCESS } from "../constants";

export const addSales = async ({ dispatch, sales, Router }) => {
  try {
    dispatch({
      type: ADD_SALES_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-sales",
      requestBody: sales,
    });
    dispatch({
      type: ADD_SALES_SUCCESS,
      payload: data.data,
    });
    router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_SALES_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};
