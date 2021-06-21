import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { reactI18nextModule } from "react-i18next";

import commonEN from './lang/en/common.json';
import commonVI from './lang/vi/common.json';
import solutionVI from './lang/vi/solution.json';
import solutionEN from './lang/en/solution.json';


// the translations
const resources = {
  en: {
    common: commonEN,
    solution: solutionEN
  },
  vi: {
    common: commonVI,
    solution: solutionVI
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "vi",
    fallbackLng: "vi", // use en if detected lng is not available
    defaultNS: "common",

    // keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    
     // react-i18next options
     react: {
      wait: true
    }
  });

export default i18n;