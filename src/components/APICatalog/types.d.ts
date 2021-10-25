export type APICatalogProps = {
  apisToDisplay: APIDetails[],
  limit?: number,
}

export type APIDetails = {
  hasMoreDetails: boolean,
  id: number,
  apiName: string,
  apiContract: string | null,
  apiDescription: string,
  apiVersion: string,
  apiRoutingId: number | string,
  apiAccess: boolean,
}
