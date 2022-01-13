import Cookies from "js-cookie";
import { makeNetworkCall } from "src/network";
import {
  ADD_STORE_FAIL,
  ADD_STORE_REQUEST,
  ADD_STORE_SUCCESS,
  GET_STORE_FAIL,
  GET_STORE_REQUEST,
  GET_STORE_SUCCESS,
} from "../constants";

export const getStores = async ({ dispatch }) => {
  try {
    dispatch({
      type: GET_STORE_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-branch" });

    dispatch({
      type: GET_STORE_SUCCESS,
      payload: data.data,
    });
    // localStorage.setItem("branch", JSON.stringify(data.data));
  } catch (error) {
    dispatch({
      type: GET_STORE_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};

export const addStore = async ({ dispatch, store, Router }) => {
  try {
    dispatch({
      type: ADD_STORE_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/create-branch",
      requestBody: store,
    });
    dispatch({
      type: ADD_STORE_SUCCESS,
      payload: data.data,
    });
    router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_STORE_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};
