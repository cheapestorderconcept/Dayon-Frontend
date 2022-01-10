import Cookies from "js-cookie";
import { LOGOUT } from "../constants/index";

export const logoutAction = async (dispatch, router) => {
  try {
    dispatch({
      type: LOGOUT,
    });
    Cookies.remove("user");
    router.push("/auth");
  } catch (error) {
    console.log(error);
  }
};
