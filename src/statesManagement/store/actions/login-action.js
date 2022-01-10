import Cookies from "js-cookie";
import { makeNetworkCall } from "src/network";
import { LOGIN_FAIL, LOGIN_SUCCESS, LOGIN_REQUEST } from "../constants/index";

export const loginAction = async (loginDetails, dispatch) => {
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
    console.log(data);
    Cookies.set("user", data.data.token);
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error?.response?.data?.response_message || error.message,
    });
  }
};
