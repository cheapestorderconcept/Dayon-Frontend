import { makeNetworkCall } from "src/network";
import {
  GET_ALL_CUSTOMERS_FAIL,
  GET_ALL_CUSTOMERS_REQUEST,
  GET_ALL_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_DEPOSITS_FAIL,
  GET_CUSTOMERS_DEPOSITS_REQUEST,
  GET_CUSTOMERS_DEPOSITS_SUCCESS,
  GET_CUSTOMERS_PURCHASED_FAIL,
  GET_CUSTOMERS_PURCHASED_REQUEST,
  GET_CUSTOMERS_PURCHASED_SUCCESS,
  GET_CUSTOMERS_TRANSACTIONS_FAIL,
  GET_CUSTOMERS_TRANSACTIONS_REQUEST,
  GET_CUSTOMERS_TRANSACTIONS_SUCCESS,
  GET_CUSTOMER_FAIL,
  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  REGISTER_CUSTOMERS_FAIL,
  REGISTER_CUSTOMERS_REQUEST,
  REGISTER_CUSTOMERS_SUCCESS,
  UPDATE_CUSTOMERS_FAIL,
  UPDATE_CUSTOMERS_REQUEST,
  UPDATE_CUSTOMERS_SUCCESS,
} from "../constants";

export const getCustomers = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_ALL_CUSTOMERS_REQUEST,
    });
    const { data } = await makeNetworkCall({ method: "GET", path: "/view-all-customers" });

    dispatch({
      type: GET_ALL_CUSTOMERS_SUCCESS,
      payload: data.data.customers,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CUSTOMERS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const addCustomer = async ({ dispatch, customer, Router, enqueueSnackbar }) => {
  try {
    dispatch({
      type: REGISTER_CUSTOMERS_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/add-customer",
      requestBody: customer,
    });
    dispatch({
      type: REGISTER_CUSTOMERS_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: REGISTER_CUSTOMERS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

// export const deleteSupplier = async ({ dispatch, supId, Router, enqueueSnackbar }) => {
//   try {
//     dispatch({
//       type: DELETE_SUPPLIERS_REQUEST,
//     });
//     const { data } = await makeNetworkCall({
//       method: "DELETE",
//       path: `/delete-supplier/${supId}`,
//     });
//     dispatch({
//       type: DELETE_SUPPLIERS_SUCCESS,
//       payload: data.data._id,
//     });
//     data &&
//       enqueueSnackbar(data?.response_message, {
//         variant: "success",
//       });
//     Router.reload(window.location.pathname);
//   } catch (error) {
//     dispatch({
//       type: DELETE_SUPPLIERS_FAIL,
//     });
//     error &&
//       enqueueSnackbar(error?.response?.data?.response_message || error.message, {
//         variant: "error",
//       });
//   }
// };

export const updateCustomer = async ({
  dispatch,
  customer,
  customerId,
  Router,
  enqueueSnackbar,
}) => {
  try {
    dispatch({
      type: UPDATE_CUSTOMERS_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `/update-customer/${customerId}`,
      requestBody: customer,
    });

    dispatch({
      type: UPDATE_CUSTOMERS_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMERS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const updateCustomerPayment = async ({
  dispatch,
  customer,
  customerId,
  Router,
  enqueueSnackbar,
}) => {
  try {
    dispatch({
      type: UPDATE_CUSTOMERS_REQUEST,
    });

    const { data } = await makeNetworkCall({
      method: "PUT",
      path: `update-payment`,
      requestBody: customer,
    });

    dispatch({
      type: UPDATE_CUSTOMERS_SUCCESS,
      payload: data.data,
    });
    data &&
      enqueueSnackbar(data?.response_message, {
        variant: "success",
      });
    // Router.reload(window.location.pathname);
  } catch (error) {
    dispatch({
      type: UPDATE_CUSTOMERS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
export const getCustomerTransactionsHistory = async ({
  dispatch,
  enqueueSnackbar,
  customerId,
  Router,
}) => {
  try {
    dispatch({
      type: GET_CUSTOMERS_TRANSACTIONS_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/view-customer-history/${customerId}`,
    });

    dispatch({
      type: GET_CUSTOMERS_TRANSACTIONS_SUCCESS,
      payload: data.data.history,
    });
    console.log("================Histoy===================");
    console.log(data);
    console.log("=================Data===================");

    Router.push({
      pathname: `/customers/registered-customers/transaction-history/${customerId}`,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMERS_TRANSACTIONS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const getCustomerDepositHistory = async ({
  dispatch,
  enqueueSnackbar,
  customerId,
  Router,
}) => {
  try {
    dispatch({
      type: GET_CUSTOMERS_DEPOSITS_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/view-customer-deposit/${customerId}`,
    });

    dispatch({
      type: GET_CUSTOMERS_DEPOSITS_SUCCESS,
      payload: data.data,
    });

    Router.push({
      pathname: `/customers/registered-customers/deposit-history/${customerId}`,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMERS_DEPOSITS_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const getCustomerPurchaseHistory = async ({
  dispatch,
  enqueueSnackbar,
  customerId,
  Router,
}) => {
  try {
    dispatch({
      type: GET_CUSTOMERS_PURCHASED_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/view-customer-purchased/${customerId}`,
    });

    dispatch({
      type: GET_CUSTOMERS_PURCHASED_SUCCESS,
      payload: data?.data,
    });

    Router.push({
      pathname: `/customers/registered-customers/purchase-history/${customerId}`,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMERS_PURCHASED_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};

export const getCustomer = async ({ dispatch, enqueueSnackbar, customerId }) => {
  try {
    dispatch({
      type: GET_CUSTOMER_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "GET",
      path: `/get-customer/${customerId}`,
    });

    dispatch({
      type: GET_CUSTOMER_SUCCESS,
      payload: data?.data?.customer,
    });
  } catch (error) {
    dispatch({
      type: GET_CUSTOMER_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
