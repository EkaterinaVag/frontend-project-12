import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { logout } from '../store/slices/authSlice';
import { appRoutes } from '../routes';

const AuthNavbar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate(appRoutes.login);
  };

  return (
    <Navbar expand="lg" className="shadow-sm navbar-light bg-white">
      <Container>
        <Navbar.Brand href={appRoutes.main}>{t('main')}</Navbar.Brand>
        {isAuthenticated && (
          <Button variant="primary" onClick={handleLogout}>
            {t('buttons.logout')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default AuthNavbar;
