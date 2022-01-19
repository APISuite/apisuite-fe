export const getFromStorage = (key: string) => {
  const storedData: string | null = localStorage.getItem(key);

  if (storedData) return JSON.parse(storedData);

  return null;
};

export const setInStorage = (key: string, data: any) => {
  const stringifiedData = JSON.stringify(data);
  
  localStorage.setItem(key, stringifiedData);

  return;
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);

  return;
};
