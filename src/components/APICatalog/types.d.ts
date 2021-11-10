export type APICatalogProps = {
  apisToDisplay: APIDetails[],
  limit?: number,
}

export type APIDetails = {
  hasMoreDetails: boolean,
  id: number,
  name: string,
  contract: string | null,
  description: string,
  version: string,
  routingId: number | string,
  access: boolean,
}
