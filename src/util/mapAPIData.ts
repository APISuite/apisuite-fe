import { APIDetails } from "components/APICatalog/types";
import { Api } from "store/subscriptions/types";

export const mapAPIData = (apis: Api[]) => {
  let hasVersions = null;

  const mappedAPIData: APIDetails[] = apis.map((api) => {
    hasVersions = !!api.apiVersions.length;

    return {
      /* An API that is 'live' (i.e., 'production accessible') is a) one that has versions, and b) has
      its 'live' property set to 'true'. Ones that do NOT meet any of the above criteria are ones
      that, presently, only have 'API Documentation' to show for it. */
      access: hasVersions && api.apiVersions[0].live,
      contract: hasVersions ? api.apiVersions[0].title : null,
      description: api.apiDocs && api.apiDocs.productIntro || "",
      name: api.name,
      // Used to link an 'API Catalog' entry to its corresponding 'API Details' view.
      routingId: hasVersions ? `${api.apiVersions[0].id}` : "",
      version: hasVersions ? api.apiVersions[0].version : "",
      hasMoreDetails: hasVersions,
      id: hasVersions ? api.apiVersions[0].apiId : api.id,
    };
  });

  return mappedAPIData;
};
