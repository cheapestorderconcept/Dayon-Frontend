import { makeNetworkCall } from "src/network";

import {
  ADD_EXPENSES_CATEGORY_FAIL,
  ADD_EXPENSES_CATEGORY_REQUEST,
  ADD_EXPENSES_CATEGORY_SUCCESS,
  ADD_EXPENSES_FAIL,
  ADD_EXPENSES_REQUEST,
  ADD_EXPENSES_SUCCESS,
  DELETE_EXPENSES_FAIL,
  DELETE_EXPENSES_REQUEST,
  DELETE_EXPENSES_SUCCESS,
  GET_EXPENSES_CARTEGORY_FAIL,
  GET_EXPENSES_CARTEGORY_REQUEST,
  GET_EXPENSES_CARTEGORY_SUCCESS,
  GET_EXPENSES_FAIL,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  UPDATE_EXPENSES_FAIL,
  UPDATE_EXPENSES_REQUEST,
  UPDATE_EXPENSES_SUCCESS,
} from "../constants/index";

export const getExpensesCategory = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_EXPENSES_CARTEGORY_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-expenses-categories" });

    dispatch({
      type: GET_EXPENSES_CARTEGORY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXPENSES_CARTEGORY_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const getExpenses = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_EXPENSES_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-expenses" });

    dispatch({
      type: GET_EXPENSES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXPENSES_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addExpensesCategory = async ({ dispatch, category, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_EXPENSES_CATEGORY_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-expenses-category",
      requestBody: category,
    });
    dispatch({
      type: ADD_EXPENSES_CATEGORY_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    getExpensesCategory({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_EXPENSES_CATEGORY_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addExpenses = async ({ dispatch, expenses, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_EXPENSES_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-expenses",
      requestBody: expenses,
    });
    dispatch({
      type: ADD_EXPENSES_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    //   Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_EXPENSES_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const deleteExpenses = async ({ dispatch, expId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: DELETE_EXPENSES_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `/delete-expenses/${expId}`,
    });
    dispatch({
      type: DELETE_EXPENSES_SUCCESS,
      payload: data.data._id,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
  } catch (error) {
    dispatch({
      type: DELETE_EXPENSES_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateExpenses = async ({ dispatch, expenses, expId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_EXPENSES_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-expenses/${expId}`,
      requestBody: expenses,
    });

    dispatch({
      type: UPDATE_EXPENSES_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
  } catch (error) {
    dispatch({
      type: UPDATE_EXPENSES_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
