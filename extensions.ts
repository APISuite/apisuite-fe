import { Extension as ExtensionV1 } from "@apisuite/extension-ui-types/v1";
//import { instanceExtension } from 'util/extensionsParams'
import { instanceExtension } from "util/extensionsParams";
import Admin from "@apisuite/extension-cloud-extension-ui";
import Marketplace from "@apisuite/apisuite-marketplace-extension-ui";

type RegistryEntry = ExtensionV1[]

const registry: RegistryEntry = [
  instanceExtension(Admin, {
    cloudExtensionUrl: "https://cloudextapi.apisuite.io",
  }),
  instanceExtension(Marketplace, {}),
].filter(Boolean);

export default registry;
