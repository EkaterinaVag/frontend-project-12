import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import ChatPage from "./ChatPage";
import SignupPage from "./SignupPage";
import AuthNavbar from "./AuthNavbar";
import ModalsContainer from "../components/modals/ModalsContainer";

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <AuthNavbar />
        <ModalsContainer />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};

export default App;
