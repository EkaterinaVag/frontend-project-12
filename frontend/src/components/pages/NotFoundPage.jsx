import { useTranslation } from 'react-i18next';

import { appRoutes } from '../../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t('notFoundPage.noExist')}</h1>
      <p className="text-muted">
        {t('notFoundPage.link')}
        {' '}
        <a href={appRoutes.main}>{t('notFoundPage.main')}</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
