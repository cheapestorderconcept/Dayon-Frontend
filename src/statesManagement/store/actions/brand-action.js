import { makeNetworkCall } from "src/network";
import {
  GET_BRANDS_REQUEST,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  ADD_BRAND_SUCCESS,
  ADD_BRAND_FAIL,
  DELETE_BRAND_REQUEST,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_FAIL,
  UPDATE_BRANDS_REQUEST,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_FAIL,
  ADD_BRAND_REQUEST,
} from "../constants/index";

export const getBrands = async (dispatch) => {
  try {
    dispatch({
      type: GET_BRANDS_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-brand" });

    dispatch({
      type: GET_BRAND_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_BRAND_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};

export const addBrand = async (dispatch, brand, Router) => {
  try {
    dispatch({
      type: ADD_BRAND_REQUEST,
    });

    alert("yeah");
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-brand",
      requestBody: brand,
    });
    console.log(data.data);
    dispatch({
      type: ADD_BRAND_SUCCESS,
      payload: data.data,
    });
    Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_BRAND_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};

export const deleteBrand = async (dispatch, brandId, Router) => {
  try {
    dispatch({
      type: DELETE_BRAND_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "DELETE",
      path: `/delete-brand/${brandId}`,
    });
    dispatch({
      type: DELETE_BRAND_SUCCESS,
      payload: data.data._id,
    });
    console.log(data.data);
    Router.reload(window.location.pathname);
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_BRAND_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};

export const updateBrand = async ({ dispatch, brand, brandId, Router }) => {
  try {
    dispatch({
      type: UPDATE_BRANDS_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-brand/${brandId}`,
      requestBody: brand,
    });
    console.log(data);
    dispatch({
      type: UPDATE_BRAND_SUCCESS,
      payload: data.data,
    });
    Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_BRAND_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};
