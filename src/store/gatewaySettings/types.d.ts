export type GatewaySettingsResponse = {
  configuration: {
    apiKey: string,
    url: string,
  },
  provider: string,
}

export type GatewaySettingsStore = {
  configuration: GatewaySettingsResponse["configuration"],
  error: boolean,
  provider: GatewaySettingsResponse["provider"],
  requesting: boolean,
}