import axios from "axios";
import Cookies from "js-cookie";
const testUrl = "https://dayon-inventory.herokuapp.com";
const liveUrl = "https://solace-hospital-backend.herokuapp.com";

const baseUrl = `${testUrl}`;

export const RequestMethod = {
  POST: "POST",
  GET: "GET",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

/* @description the function below is used to make network request to external server...... It
 * can easily be passed around
 *
 */

export const makeNetworkCall = async ({ method, path, requestBody, params, target }) => {
  if (!method || !path) {
    throw new Error("A required parameter is missing. Please provide method or path");
  }

  const token = Cookies.get("user");

  const config = {
    method,
    url: target == "service" ? `${baseUrl}/api/service/v1/${path}` : `${baseUrl}/api/v1/${path}`,
    params: params,
    headers: {
      Authorization: `Bearer ${token}`,
      ContentType: "application/json",
    },
    data: requestBody,
  };
  const response = await axios(config);
  return response;
};
