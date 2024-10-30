import program from "../program";
import { loadTranslation } from "../helpers/loadTranslation";
import { diffTranslations } from "../helpers/diffTranslations";
import { aiTranslate } from "../helpers/aiTranslate";
import { mergeTranslations } from "../helpers/mergeTranslations";
import { saveTranslation } from "../helpers/saveTranslation";

program
  .command("translate")
  .description("Translate specific language")
  .argument("<string>", "Language code like en, es, fr, etc.")
  .action(async (langCode) => {
    const english = await loadTranslation("en");
    const desiredLanguage = await loadTranslation(langCode);
    const diff = diffTranslations(english, desiredLanguage);
    const translatedData = await aiTranslate(diff, langCode);
    const newTranslation = mergeTranslations(desiredLanguage, translatedData);
    await saveTranslation(langCode, newTranslation);
    console.log(`Translation for ${langCode} completed`);
  });
