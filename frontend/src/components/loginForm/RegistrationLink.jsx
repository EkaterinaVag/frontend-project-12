import { appRoutes } from '../../routes';

const RegistrationLink = ({ t }) => (
  <div className="card-footer p-4">
    <div className="text-center">
      <span>
        {t('loginPage.exist')}
        {' '}
      </span>
      <a href={appRoutes.signup}>{t('loginPage.registration')}</a>
    </div>
  </div>
);

export default RegistrationLink;
