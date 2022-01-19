export const getFromStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setInStorage = (key: string, data: string): null => {
  localStorage.setItem(key, data);

  return null;
};

export const removeFromStorage = (key: string): null => {
  localStorage.removeItem(key);

  return null;
};
