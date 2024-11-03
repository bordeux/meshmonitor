export const createRxTime = (rxTime: number) => {
  if (!rxTime) {
    return new Date();
  }
  const date = new Date(rxTime * 1000);
  if (
    date.getTime() > Date.now() ||
    date.getTime() < Date.now() - 1000 * 36000
  ) {
    return new Date();
  }

  return date;
};
