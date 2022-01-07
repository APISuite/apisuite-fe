/** Endpoints constants */

const { hostname } = window.location;

export const IS_CLOUD = hostname.indexOf(".cloud.apisuite.io") >= 0;

function buildCloudServiceUrl (service: string) {
  const client = hostname.substring(0, hostname.indexOf("."));
  const apiHostname = hostname.replace(client, `${client}-${service}`);
  return `https://${apiHostname}`;
}

/**
 * For when running in the cloud environment.
 * Given the current Portal hostname, get the corresponding domain for another
 * service running in a given subdomain prefix.
 * Ex: ${client}.cloud.apisuite.io -> ${service}.${client}.cloud.apisuite.io
 *
 * @param service
 */
export function getCloudUrlForSubdomainSuffix (service: string) {
  if (IS_CLOUD) return buildCloudServiceUrl(service);
  return null;
}

function getApiUrl () {
  if (IS_CLOUD) return buildCloudServiceUrl("api");
  return process.env.API_URL || "";
}

export const API_URL = getApiUrl();
export const INFORM_URL = process.env.INFORM_URL || "";
