import { AppTypes, AppTypesTab } from "pages/AppView/types";
import { AppType } from "store/applications/types";
import { isExtensionActive } from "util/extensions";

const active = isExtensionActive("@apisuite/apisuite-marketplace-extension-ui");

const TABS = [
  AppTypesTab.GENERAL, AppTypesTab.MEDIA, AppTypesTab.CLIENT,
  AppTypesTab.EXTERNAL, AppTypesTab.EXPERT, AppTypesTab.ACCESS_DETAILS,
];

export const getNextType = (type: AppType, current: AppTypesTab) => {
  const appType = type.type;
  let idx = 3; // AppTypes.CLIENT index
  if (active && appType === AppTypes.EXTERNAL) {
    idx = 4;
  }
  if (active && appType === AppTypes.EXPERT) {
    idx = 5;
  }

  const tabs = (appType === AppTypes.BLUEPRINT || appType === AppTypes.CONNECTOR) ?
    [TABS[0], TABS[1], TABS[5]] : TABS.slice(0, idx);

  const currentPos = tabs.indexOf(current);
  return tabs.length - 1 > currentPos ? tabs[currentPos + 1] : null;
};

export const getPreviousType = (type: AppType, current: AppTypesTab) => {
  const appType = type.type;
  let idx = 3; // AppTypes.CLIENT index
  if (active && appType === AppTypes.EXTERNAL) {
    idx = 4;
  }
  if (active && appType === AppTypes.EXPERT) {
    idx = 5;
  }

  const tabs = (appType === AppTypes.BLUEPRINT || appType === AppTypes.CONNECTOR) ?
    [TABS[0], TABS[1], TABS[5]] : TABS.slice(0, idx);

  const currentPos = tabs.indexOf(current);
  return currentPos > 0 ? tabs[currentPos - 1] : null;
};
