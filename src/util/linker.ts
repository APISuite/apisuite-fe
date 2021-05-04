/* Generate a the URL with proper prefix */
export function linker (url: string, secure = true) {
  const prefix = secure ? "https://" : "http://";
  return (url.indexOf("://") === -1) ? prefix + url : url;
}
