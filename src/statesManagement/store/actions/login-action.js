import Cookies from "js-cookie";
import { makeNetworkCall } from "src/network";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST } from "../constants/index";
import { getBrands } from "./brand-action";
import { getProduct } from "./product-action";
import { getPurchase } from "./purchase-action";
import { getStaff } from "./register-staff-action";
import { getSuppliers } from "./supplier-action";

export const loginAction = async ({ loginDetails, dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const { data } = await makeNetworkCall({
      method: "POST",
      path: "/login",
      requestBody: loginDetails,
    });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data.token,
    });

    Cookies.set("user", data.data.token);
    getProduct({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    getSuppliers({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    getBrands({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    getPurchase({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
    getStaff({ dispatch: dispatch, enqueueSnackbar: enqueueSnackbar });
  } catch (error) {
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
