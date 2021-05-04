/** Endpoints constants */

const { hostname } = window.location;

export const IS_CLOUD = hostname.indexOf(".cloud.apisuite.io") >= 0;

/**
 * For when running in the cloud environment.
 * Given the current Portal hostname, get the corresponding domain for another
 * service running in a given subdomain prefix.
 * Ex: ${client}.cloud.apisuite.io -> ${client}-${subdomainSuffx}.cloud.apisuite.io
 *
 * @param subdomainSuffix
 */
export function getCloudUrlForSubdomainSuffix (subdomainSuffix: string) {
  if (IS_CLOUD) {
    const apiHostname = hostname.replace(".", `-${subdomainSuffix}.`);
    return `https://${apiHostname}`;
  }

  return null;
}

function getApiUrl () {
  if (IS_CLOUD) {
    // Transform the Portal's hostname into the API's hostname
    // Ex: ${client}.cloud.apisuite.io -> ${client}-apisuite-api.cloud.apisuite.io
    const apiHostname = hostname.replace(".", "-apisuite-api.");
    return `https://${apiHostname}`;
  }

  return process.env.API_URL || "";
}

export const API_URL = getApiUrl();
export const INFORM_URL = process.env.INFORM_URL || "";
