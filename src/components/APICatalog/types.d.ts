export type APICatalogProps = {
  apisToDisplay: APIDetails[],
}

export type APIDetails = {
  hasMoreDetails: boolean,
  id: number,
  apiName: string,
  apiDescription: string,
  apiVersion: string,
  apiRoutingId: number | string,
  apiAccess: boolean,
}
