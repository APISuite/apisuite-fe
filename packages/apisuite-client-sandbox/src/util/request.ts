/*
 * Request
 * fetch wrapper
 */

import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

export interface ErrorReason {
  /** response status */
  status: number,
  /** response status text */
  statusText: string,
  /** response message */
  message: string,
}

function checkToken (response: AxiosResponse) {
  const search = response.request.responseURL.split('?')[1]
  const urlParams = new URLSearchParams(search)
  const token = urlParams.get('token')

  return {
    hasToken: !!token,
    token,
  }
}

async function checkStatus (response: AxiosResponse) {
  // TODO: we should review this reponse handling
  if (response.statusText === 'OK' || response.statusText === 'Created') {
    // TODO add this back when API changes
    // const contentType = response.headers.get('Content-Type')

    // if (contentType && /application\/json/.test(contentType)) {
    //   return Promise.resolve(response.json())
    // }

    // check if the response has a token and get it
    const { hasToken, token } = checkToken(response)
    if (hasToken) {
      return Promise.resolve({ token })
    }

    return Promise.resolve(response.data)
  }

  const reason: ErrorReason = {
    status: response.status,
    statusText: response.statusText,
    message: response.data || response.statusText,
  }

  return Promise.reject(reason)
}

export default async function request (init: AxiosRequestConfig) {
  const response = await axios({ ...init, withCredentials: true })

  return checkStatus(response)
}

export async function requestInform (init: AxiosRequestConfig) {
  const response = await axios({ ...init, withCredentials: false })

  return checkStatus(response)
}
