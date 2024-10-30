import { Translation } from "./loadTranslation";
import { getClient } from "./openAiClient";
import languageCodes from "../data/languages.json";

export const aiTranslate = async (
  translation: Translation,
  desiredLanguageCode: string,
) => {
  const langData =
    languageCodes[desiredLanguageCode as keyof typeof languageCodes];

  if (langData === undefined) {
    throw new Error("Invalid language code: " + desiredLanguageCode);
  }

  const data = await getClient().chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `
        You are translator from english to ${langData.name}. User will send you JSON data.
        You should translate all values, keeping this same JSON schema and keys.
        You should not translate placeholders what are HTML tags and text in {{ }}.
        You should return only translated JSON data back.
        `.trim(),
      },
      { role: "user", content: JSON.stringify(translation) },
    ],
    stream: false,
  });

  if (!data?.choices?.length) {
    throw new Error("No response from AI");
  }

  const content = data.choices[0].message.content;

  if (!content) {
    throw new Error("Invalid response from AI: " + content);
  }

  try {
    const translation = JSON.parse(content);

    return translation as Translation;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    throw new Error("Invalid response from AI: " + content);
  }
};
