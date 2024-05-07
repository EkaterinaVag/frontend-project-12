import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import NotFoundPage from "./components/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
