import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ChatPage from './pages/ChatPage';
import SignupPage from './pages/SignupPage';
import AuthNavbar from './AuthNavbar';
import ModalsContainer from './modals/ModalsContainer';
import { appRoutes } from '../routes';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <AuthNavbar />
      <ModalsContainer />
      <Routes>
        <Route path={appRoutes.main} element={<ChatPage />} />
        <Route path={appRoutes.login} element={<LoginPage />} />
        <Route path={appRoutes.signup} element={<SignupPage />} />
        <Route path={appRoutes.notFound} element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </div>
);

export default App;
