import { makeNetworkCall } from "src/network";
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_PRODUCT_BY_BARCODE_REQUEST,
  GET_PRODUCT_BY_BARCODE_SUCCESS,
  GET_PRODUCT_BY_BARCODE_FAIL,
} from "../constants/index";

export const getProductWithBarcode = async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-product/barcode" });
    console.log(data.data);
    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};

export const getProduct = async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCT_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-product" });
    console.log(data.data);
    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};

export const getProductByBarcode = async (dispatch, barcode) => {
  try {
    dispatch({
      type: GET_PRODUCT_BY_BARCODE_REQUEST,
    });

    const { data } = await makeNetworkCall({ method: "GET", path: `/view-product/${barcode}` });
    console.log(data.data);
    dispatch({
      type: GET_PRODUCT_BY_BARCODE_SUCCESS,
      payload: data.data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: GET_PRODUCT_BY_BARCODE_FAIL,
      payload: error?.response?.data?.response_message,
    });
  }
};

export const addProduct = async (dispatch, product, Router) => {
  try {
    dispatch({
      type: ADD_PRODUCT_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-product",
      requestBody: product,
    });
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: data.data,
    });
    Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};

// export const deleteProduct = async (dispatch, productId, Router) => {
//   try {
//     dispatch({
//       type: DELETE_PRODUCT_REQUEST,
//     });
//     const { data } = await makeNetworkCall({
//       method: "DELETE",
//       path: `/delete-product/${productId}`,
//     });
//     dispatch({
//       type: DELETE_PRODUCT_SUCCESS,
//       payload: data.data._id,
//     });
//     console.log(data.data);
//     Router.reload(window.location.pathname);
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: DELETE_PRODUCT_FAIL,
//       payload: error?.response?.data?.response_message,
//     });
//   }
// };

// export const updateProduct = async ({ dispatch, product, productId, Router }) => {
//   try {
//     dispatch({
//       type: UPDATE_PRODUCT_REQUEST,
//     });

//     const { data } = await makeNetworkCall({
//       method: "PUT",
//       path: `/update-product/${productId}`,
//       requestBody: product,
//     });
//     alert("cliked");
//     console.log(data);
//     dispatch({
//       type: UPDATE_PRODUCT_SUCCESS,
//       payload: data.data,
//     });
//     Router.reload(window.location.pathname);
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: UPDATE_PRODUCT_FAIL,
//       payload: error?.response?.data?.response_message,
//     });
//   }
// };
