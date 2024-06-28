import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import ChatPage from "./ChatPage";
import { AuthProvider } from "../contexts/AuthContext.";
import { Navbar, Container } from "react-bootstrap";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Navbar expand="lg" className="shadow-sm navbar-light bg-white">
            <Container>
              <Navbar.Brand href="#/">Hexlet Chat</Navbar.Brand>
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
