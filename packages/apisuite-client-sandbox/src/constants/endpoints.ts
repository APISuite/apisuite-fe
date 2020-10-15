/** Endpoints constants */

const { hostname } = window.location

export const IS_CLOUD = hostname.indexOf('.cloud.apisuite.io') >= 0

/**
 * For when running in the cloud environment.
 * Given the current Portal hostname, get the corresponding domain for another
 * service running in a given subdomain prefix.
 * Ex: ${client}.cloud.apisuite.io -> ${client}-${subdomainSuffx}.cloud.apisuite.io
 *
 * @param subdomain
 */
export function getCloudUrlForSubdomainSuffix (subdomainSuffix: string) {
  if (IS_CLOUD) {
    const apiHostname = hostname.replace('.', `-${subdomainSuffix}.`)
    return `https://${apiHostname}`
  }

  return null
}

function getApiUrl () {
  if (IS_CLOUD) {
    // Transform the Portal's hostname into the API's hostname
    // Ex: ${client}.cloud.apisuite.io -> ${client}-apisuite-api.cloud.apisuite.io
    const apiHostname = hostname.replace('.', '-apisuite-api.')
    return `https://${apiHostname}`
  }

  return process.env.API_URL || ''
}

function getAuthUrl () {
  if (IS_CLOUD) {
    // Transform the Portal's hostname into the API's hostname
    // Ex: ${client}.cloud.apisuite.io -> ${client}-hydraapi.cloud.apisuite.io
    const authHostname = hostname.replace('.', '-hydraapi.')
    return `https://${authHostname}`
  }

  return process.env.AUTH_URL || ''
}

export const AUTH_URL = getAuthUrl()
export const API_URL = getApiUrl()
export const INFORM_URL = process.env.INFORM_URL || ''
export const SIGNUP_PORT = process.env.SIGNUP_PORT || ''
export const LOGIN_PORT = process.env.LOGIN_PORT || ''
