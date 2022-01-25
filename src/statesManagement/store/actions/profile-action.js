import { makeNetworkCall } from "src/network";
import { GET_PROFILE_FAIL, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS } from "../constants";

export const getProfile = async ({ dispatch, enqueueSnackbar }) => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    const { data } = await makeNetworkCall({ method: "GET", path: "profile" });
    console.log(data.data);
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
    });
    error &&
      enqueueSnackbar(error?.response?.data?.response_message || error.message, {
        variant: "error",
      });
  }
};
