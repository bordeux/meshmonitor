import English from "./en";
import Polish from "./pl";
import French from "./fr";
import German from "./de";
import Spanish from "./es";
import Czech from "./cs";
import Swedish from "./sv";

export default <const>{
  en: English,
  pl: Polish,
  fr: French,
  de: German,
  es: Spanish,
  cz: Czech,
  sv: Swedish,
};

export type LocaleType = typeof English;
