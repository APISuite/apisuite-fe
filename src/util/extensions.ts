import { Extension } from "@apisuite/extension-ui-types/v1";
import {
  MenuEntry,
  PageEntry,
  RoleRequirement,
} from "@apisuite/extension-ui-types";
import extensions from "../../extensions";
import { validateRoleConfig } from "./roleSetup";

const filterMenuEntryByRole = (
  resourceRoleReq: RoleRequirement, roleName: string | undefined,
): boolean => {
  if (!resourceRoleReq) {
    return true;
  }
  return validateRoleConfig(resourceRoleReq, roleName ? [roleName] : []);
};

export const getMenuEntries = (menu: string, roleName?: string) => {
  return extensions
    .reduce((accum: MenuEntry[], ext: Extension) => {
      const extensionMenuEntries =
        ext.hooks && ext.hooks.menu && ext.hooks.menu(menu);
      return extensionMenuEntries
        ? [...accum, ...extensionMenuEntries]
        : accum;
    }, [] as MenuEntry[])
    .filter(Boolean)
    .filter((menuEntry) => filterMenuEntryByRole(menuEntry.role, roleName));
};

export const getRoutes = () => {
  return extensions
    .reduce((accum: PageEntry[], ext: Extension) => {
      const extensionPages = ext.hooks && ext.hooks.pages && ext.hooks.pages();
      return extensionPages ? [...accum, ...extensionPages] : accum;
    }, [] as PageEntry[])
    .filter(Boolean);
};

/**
* The following code checks if an extension's section exists, and if it does,
* it optionally passes something along to it (e.g., some form's state, a function, whatever one might want/need).
*/
export const getSections = (section: string, args?: Record<string, unknown>) => {
  return extensions
    .reduce((accum: any[], ext: Extension) => {
      const extensionSection =
        ext.hooks && ext.hooks.sections && ext.hooks.sections(section, args);
      return extensionSection ? [...accum, extensionSection] : accum;
    }, [] as any)
    .filter(Boolean);
};
