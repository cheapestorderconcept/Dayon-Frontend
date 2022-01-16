import { makeNetworkCall } from "src/network";
import {
  ADD_PURCHASE_FAIL,
  ADD_PURCHASE_REQUEST,
  ADD_PURCHASE_SUCCESS,
  GET_PURCHASE_FAIL,
  GET_PURCHASE_REQUEST,
  GET_PURCHASE_SUCCESS,
} from "../constants";

export const getPurchase = async (dispatch) => {
  try {
    dispatch({
      type: GET_PURCHASE_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-purchase" });
    console.log(data.data);
    dispatch({
      type: GET_PURCHASE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PURCHASE_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};

export const addPurchase = async (dispatch, purchase, Router) => {
  try {
    dispatch({
      type: ADD_PURCHASE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-purchase",
      requestBody: purchase,
    });
    console.log(data);
    dispatch({
      type: ADD_PURCHASE_SUCCESS,
      payload: data,
    });

    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_PURCHASE_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};
