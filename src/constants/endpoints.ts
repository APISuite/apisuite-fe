const { hostname } = window.location;

export const IS_CLOUD = hostname.indexOf(".cloud.apisuite.io") >= 0;

export function buildCloudBackendUrl (service = "") {
  const client = hostname.substring(0, hostname.indexOf("."));
  const apiHostname = "https://" + hostname.replace(client, `${client}-api`);
  if (!service.length) return apiHostname;
  const url = new URL(service, apiHostname);
  return url.toString();
}

function getApiUrl () {
  if (IS_CLOUD) return buildCloudBackendUrl();
  return process.env.API_URL || "";
}

function getAppConnectorUrl () {
  if (IS_CLOUD) return buildCloudBackendUrl();
  return process.env.APP_CONNECTOR_API_URL || "https://appconnector.proxy.apisuite.io";
}

function getBlueprintsUrl () {
  if (IS_CLOUD) return buildCloudBackendUrl();
  return process.env.BLUEPRINT_APPS_URL || "https://blueprints.apisuite.io/blueprints";
}

export const API_URL = getApiUrl();
export const INFORM_URL = process.env.INFORM_URL || "";

export const APP_CONNECTOR_URL = getAppConnectorUrl();
export const BLUEPRINT_APPS_URL = getBlueprintsUrl();
