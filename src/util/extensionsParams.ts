import { Extension as ExtensionV1 } from "@apisuite/extension-ui-types/v1";
import { injectReducer, injectSaga } from "store";
import { getCloudUrlForSubdomainSuffix } from "constants/endpoints";
import request, {
  axios,
  apiRequest,
  requestInform,
  apiRequestInform,
} from "util/request";

export const paramsV1 = {
  getCloudUrlForSubdomainSuffix,
  store: {
    injectReducer,
    injectSaga,
  },
  request: {
    axios,
    request,
    apiRequest,
    requestInform,
    apiRequestInform,
  },
};

/**
 * Given an Extension class and the extension's configuration, creates an
 * instance of the Extension that takes into account the different instancing
 * signatures of the Extensions in the different instantiation protocols. Note
 * that there is only one signature.
 *
 * Currently there is only a single Extension instantiation protocol. Once there
 * are more, this code needs to be adapted.
 *
 * Example usage:
 *
 *     const extension = instanceExtension(SomeExtension, { param1: 'val1' })
 *
 * @param Extension An instancable Extension class
 * @param config The configuration of the extension
 */
export const instanceExtension = <T, U extends any[]> (
  Extension: { new (...args: U): T },
  config: U[0]["config"],
): T => {
  const E = Extension as unknown as ExtensionV1;
  switch (E.protocolVersion) {
    case "1": {
      const args = [[{ core: paramsV1, config }]] as any[];
      return new Extension(...args[0]);
    }
    default: {
      const args = [[{ core: paramsV1, config }]] as any[];
      return new Extension(...args[0]);
    }
  }
};
