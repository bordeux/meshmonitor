import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

export const getClient = () => {
  return client;
};
