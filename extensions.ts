import { Extension as ExtensionV1 } from "@apisuite/extension-ui-types/v1";
//import { instanceExtension } from 'util/extensionsParams'
//import { instanceExtension } from 'util/extensionsParams'
// import Example from '@apisuite/extension-ui-example'
//import Marketplace from "@apisuite/apisuite-marketplace-extension-ui";

type RegistryEntry = ExtensionV1[]

const registry: RegistryEntry = [
  // instanceExtension(Example, { someKey: 'Overriden value' }),
  //instanceExtension(Marketplace, {}),
].filter(Boolean);

export default registry;
