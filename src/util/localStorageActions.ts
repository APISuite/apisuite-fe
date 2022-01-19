export const getFromStorage = (key: string) => {
  const storedData: string | null = localStorage.getItem(key);

  if (storedData) return JSON.parse(storedData);
};

export const setInStorage = (key: string, data: any) => {
  const stringifiedData = JSON.stringify(data);
  
  localStorage.setItem(key, stringifiedData);
};

export const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};
