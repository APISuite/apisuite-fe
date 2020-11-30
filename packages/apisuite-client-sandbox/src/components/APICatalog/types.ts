export type APICatalogProps = {
  recentlyAddedAPIs: APIDetails[],
}

export type APIDetails = {
  hasMoreDetails: boolean,
  id: number,
  apiName: string,
  apiDescription: string,
  apiVersion: string,
  apiRoutingId: number | '',
  apiAccess: boolean,
}
