export const clearProps = (obj: unknown, props: string[]) => {
  const data = JSON.parse(JSON.stringify(obj));
  for (const prop of props) {
    if (data.hasOwnProperty(prop)) {
      delete data[prop];
    }
  }
  return data;
};
