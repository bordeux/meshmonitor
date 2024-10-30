import pino from "pino";

const logger = pino({});

export const getLogger = (): typeof logger => {
  return logger;
};
