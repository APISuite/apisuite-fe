export const getFromStorage = (key: string) => {
  const storedData: string | null = localStorage.getItem(key);

  if (storedData) return JSON.parse(storedData);

  return null;
};

export const setInStorage = (key: string, data: any): null => {
  const stringifiedData = JSON.stringify(data);
  
  localStorage.setItem(key, stringifiedData);

  return null;
};

export const removeFromStorage = (key: string): null => {
  localStorage.removeItem(key);

  return null;
};
