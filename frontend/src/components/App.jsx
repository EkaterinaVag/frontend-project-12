import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import NotFoundPage from "./NotFoundPage";
import ChatPage from "./ChatPage";
import { AuthProvider, AuthContext } from "../contexts/AuthContext";
import { Navbar, Container, Button } from "react-bootstrap";

const App = () => {
  const { loggedIn, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  return (
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Navbar expand="lg" className="shadow-sm navbar-light bg-white">
          <Container>
            <Navbar.Brand href="#/">Hexlet Chat</Navbar.Brand>
            {loggedIn && (
              <Button variant="primary" onClick={handleLogout}>
                Выйти
              </Button>
            )}
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
