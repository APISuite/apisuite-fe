import { LOCAL_STORAGE_ACTIONS } from "constants/global";

export const handleLocalStorage = (action: LOCAL_STORAGE_ACTIONS, key: string, data?: string): string | null => {
  if (action === LOCAL_STORAGE_ACTIONS.GET) {
    return localStorage.getItem(key);
  }
  
  if (action === LOCAL_STORAGE_ACTIONS.SET && data) {
    localStorage.setItem(key, data);
  }

  if (action === LOCAL_STORAGE_ACTIONS.REMOVE) {
    localStorage.removeItem(key);
  }

  return null;
};
