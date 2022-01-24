import { AppTypes, AppTypesTab } from "pages/AppView/types";
import { AppType } from "store/applications/types";

const TABS = [
  AppTypesTab.GENERAL,
  AppTypesTab.MEDIA,
  AppTypesTab.CLIENT,
  AppTypesTab.EXTERNAL,
  AppTypesTab.EXPERT,
];

export const getNextType = (type: AppType, current: AppTypesTab) => {
  const appType = type.type;
  let idx = 3; // AppTypes.CLIENT index
  if (appType === AppTypes.EXTERNAL) {
    idx = 4;
  }
  if (appType === AppTypes.EXPERT) {
    idx = 5;
  }
  const tabs = TABS.slice(0, idx);

  const currentPos = tabs.indexOf(current);
  return tabs.length - 1 > currentPos ? tabs[currentPos + 1] : null;
};

export const getPreviousType = (type: AppType, current: AppTypesTab) => {
  const appType = type.type;
  let idx = 3; // AppTypes.CLIENT index
  if (appType === AppTypes.EXTERNAL) {
    idx = 4;
  }
  if (appType === AppTypes.EXPERT) {
    idx = 5;
  }
  const tabs = TABS.slice(0, idx);

  const currentPos = tabs.indexOf(current);
  return currentPos > 0 ? tabs[currentPos - 1] : null;
};
