import { makeNetworkCall } from "src/network";
import {
    ADD_SERVICE_CATEGORY_FAIL,
    ADD_SERVICE_CATEGORY_REQUEST,
    ADD_SERVICE_CATEGORY_SUCCESS,
 GET_SERVICE_CATEGORIES_FAIL, GET_SERVICE_CATEGORIES_REQUEST, GET_SERVICE_CATEGORIES_SUCCESS

} from "../constants/index";

export const getServiceCategories = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_SERVICE_CATEGORIES_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "fetch-all-categories", target:"service" });

    dispatch({
      type: GET_SERVICE_CATEGORIES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SERVICE_CATEGORIES_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addServiceCategory = async ({ dispatch, category, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: ADD_SERVICE_CATEGORY_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "POST",
      path: "add-service-categories",
      requestBody: category,
      target:"service"
    });
    console.log(data.data);
    dispatch({
      type: ADD_SERVICE_CATEGORY_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_SERVICE_CATEGORY_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};



export const deleteServiceCategory = async ({ dispatch, brandId, Router, enqueueSnackbar }) => {
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
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: DELETE_BRAND_FAIL,
    });

    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateBrand = async ({ dispatch, brand, brandId, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: UPDATE_BRANDS_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-brand/${brandId}`,
      requestBody: brand,
    });

    dispatch({
      type: UPDATE_BRAND_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_BRAND_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};


// Continue Other Services Actions from here...