import program from "../program";
import { loadTranslation } from "../helpers/loadTranslation";
import { diffTranslations } from "../helpers/diffTranslations";
import { aiTranslate } from "../helpers/aiTranslate";
import { mergeTranslations } from "../helpers/mergeTranslations";
import { saveTranslation } from "../helpers/saveTranslation";
import { getCurrentLanguagesCodes } from "../helpers/getCurrentLanguagesCodes.ts";

const CODE_ALL = "all";
program
  .command("translate")
  .description("Translate specific language")
  .argument(
    "<string>",
    `Language code like en, es, fr, etc. For all languages - set \`${CODE_ALL}\``,
  )
  .action(async (selectedCode) => {
    const english = await loadTranslation("en");
    const languages =
      selectedCode === CODE_ALL ? getCurrentLanguagesCodes() : [selectedCode];

    for (const langCode of languages) {
      const desiredLanguage = await loadTranslation(langCode);
      const diff = diffTranslations(english, desiredLanguage);
      const translatedData = await aiTranslate(diff, langCode);
      const newTranslation = mergeTranslations(desiredLanguage, translatedData);
      await saveTranslation(langCode, newTranslation);
      console.log(`Translation for ${langCode} completed`);
    }

    console.log(`Finished translating`);
  });
