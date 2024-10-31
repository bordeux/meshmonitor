export const createRxTime = (rxTime: number) => {
  if (!rxTime) {
    return new Date();
  }
  const date = new Date(rxTime * 1000);
  if (date.getTime() > Date.now()) {
    return new Date();
  }

  return date;
};
