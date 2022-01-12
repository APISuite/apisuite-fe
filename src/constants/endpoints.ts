/** Endpoints constants */

const { hostname } = window.location;

export const IS_CLOUD = hostname.indexOf(".cloud.apisuite.io") >= 0;

export function buildCloudBackendUrl (service = "") {
  const client = hostname.substring(0, hostname.indexOf("."));
  const apiHostname = hostname.replace(client, `${client}-api`);
  const url = new URL(service, `https://${apiHostname}`);
  return url.toString();
}

function getApiUrl () {
  if (IS_CLOUD) return buildCloudBackendUrl();
  return process.env.API_URL || "";
}

export const API_URL = getApiUrl();
export const INFORM_URL = process.env.INFORM_URL || "";
