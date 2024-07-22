import i18next from "i18next";
import resources from "./locales/index";

const init = async () => {
  const defaultLang = "ru";

  const i18n = i18next.createInstance();
  await i18n.init({
    lng: defaultLang,
    debug: false,
    resources,
  });
};

export default init;
