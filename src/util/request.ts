/*
 * Request
 * fetch wrapper
 */

import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { API_URL } from "constants/endpoints";

export interface ErrorReason {
  /** response status */
  status: number,
  /** response status text */
  statusText: string,
  /** response message */
  message: string,
}

export type RequestStatus = {
  isRequesting: boolean,
  error: string,
}

function checkToken (response: AxiosResponse) {
  const search = response.request.responseURL.split("?")[1];
  const urlParams = new URLSearchParams(search);
  const token = urlParams.get("token");

  return {
    hasToken: !!token,
    token,
  };
}

export { axios };

function checkStatus (response: AxiosResponse) {
  if (response.status >= 200 && response.status < 400) {
    // check if the response has a token and get it
    const { hasToken, token } = checkToken(response);
    if (hasToken) {
      return { token };
    }

    return response.data;
  }

  let errorsMsg = response.data;

  if (response.data && response.data.errors) {
    errorsMsg = response.data.errors.join(" ");
  }

  const reason: ErrorReason = {
    status: response.status,
    statusText: response.statusText,
    message: errorsMsg || response.statusText || response,
  };

  return reason;
}

export default async function request (init: AxiosRequestConfig) {
  try {
    const response = await axios({ ...init, withCredentials: true });

    return checkStatus(response);
  } catch (error) {
    if (error.response) {
      throw checkStatus(error.response);
    } else if (error.request) {
      throw checkStatus(error.request);
    } else {
      const reason: ErrorReason = {
        status: 500,
        statusText: "Internal Server Error",
        message: error.message,
      };
      throw reason;
    }
  }
}

export async function requestInform (init: AxiosRequestConfig) {
  const response = await axios({ ...init, withCredentials: false });

  return checkStatus(response);
}

export async function apiRequest (init: AxiosRequestConfig) {
  const baseUrl = `${API_URL}`;
  return request({
    ...init,
    url: `${baseUrl}${init.url}`,
  });
}

export async function apiRequestInform (init: AxiosRequestConfig) {
  const baseUrl = `${API_URL}`;
  return requestInform({
    ...init,
    url: `${baseUrl}${init.url}`,
  });
}
