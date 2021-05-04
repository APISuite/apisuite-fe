const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** generates a random state */
export default function (size = 15) {
  let randomState = "";
  if (window && window.crypto && window.crypto.getRandomValues) {
    const container = new Uint8Array(size);
    window.crypto.getRandomValues(container);
    const numChars: number[] = Array.from(container.map(x => validChars.charCodeAt(x % validChars.length)));
    randomState = String.fromCharCode.apply(null, numChars);
  } else {
    for (let i = 0; i < size; i++) {
      randomState += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
  }

  return randomState;
}
