import i18next from "i18next";
import { initReactI18next, I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";

import resources from "./locales/index";
import { store } from "./store";
import App from "./components/App";

const init = async () => {
  const defaultLang = "ru";

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    lng: defaultLang,
    debug: true,
    resources,
  });

  return (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );
};

export default init;
