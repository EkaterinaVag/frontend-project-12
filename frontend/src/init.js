import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';

import resources from './locales/index';
import store from './store';
import App from './components/App';

const init = async () => {
  const defaultLang = 'ru';
  filter.loadDictionary('ru');

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({
    lng: defaultLang,
    debug: true,
    resources,
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Provider>
      </I18nextProvider>
    </RollbarProvider>
  );
};

export default init;
