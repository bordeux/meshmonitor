export const bufferToHexString = (buffer: Uint8Array) => {
  return Array.from(buffer)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};
