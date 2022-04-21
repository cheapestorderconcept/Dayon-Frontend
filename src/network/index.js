import axios from "axios";
import Cookies from "js-cookie";
const testUrl = "https://dayon-inventory.herokuapp.com";
const liveUrl = "https://adeshexglobal.herokuapp.com";

const baseUrl = `${liveUrl}/api/v1`;

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

export const makeNetworkCall = async ({ method, path, requestBody, params }) => {
  if (!method || !path) {
    throw new Error("A required parameter is missing. Please provide method or path");
  }

  const token = Cookies.get("user");

  const config = {
    method,
    url: `${baseUrl}/${path}`,
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
