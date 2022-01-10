import { makeNetworkCall } from "src/network";
import {
  ADD_SUPPLIERS_REQUEST,
  ADD_SUPPLIERS_SUCCESS,
  ADD_SUPPLIERS_FAIL,
  GET_SUPPLIERS_SUCCESS,
  GET_SUPPLIERS_FAIL,
  GET_SUPPLIERS_REQUEST,
  DELETE_SUPPLIERS_REQUEST,
  DELETE_SUPPLIERS_SUCCESS,
  DELETE_SUPPLIERS_FAIL,
  UPDATE_SUPPLIER_REQUEST,
  UPDATE_SUPPLIERS_SUCCESS,
  UPDATE_SUPPLIERS_FAIL,
} from "../constants/index";

export const getSuppliers = async (dispatch) => {
  try {
    dispatch({
      type: GET_SUPPLIERS_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-supplier" });
    console.log(data.data);
    dispatch({
      type: GET_SUPPLIERS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SUPPLIERS_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};

export const addSupplier = async (dispatch, supplier, Router) => {
  try {
    dispatch({
      type: ADD_SUPPLIERS_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-supplier",
      requestBody: supplier,
    });
    dispatch({
      type: ADD_SUPPLIERS_SUCCESS,
      payload: data.data,
    });
    Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_SUPPLIERS_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};

export const deleteSupplier = async (dispatch, supId, Router) => {
  try {
    dispatch({
      type: DELETE_SUPPLIERS_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `/delete-supplier/${supId}`,
    });
    dispatch({
      type: DELETE_SUPPLIERS_SUCCESS,
      payload: data.data._id,
    });
    console.log(data.data);
    Router.reload(window.location.pathname);
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_SUPPLIERS_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};

export const updateSupplier = async ({ dispatch, supplier, supId, Router }) => {
  try {
    dispatch({
      type: UPDATE_SUPPLIER_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-supplier/${supId}`,
      requestBody: supplier,
    });
    console.log(data);
    dispatch({
      type: UPDATE_SUPPLIERS_SUCCESS,
      payload: data.data,
    });
    Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_SUPPLIERS_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};
