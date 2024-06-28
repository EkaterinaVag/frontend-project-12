import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.";
import image from "../assets/image.jpg";

const apiPath = "/api/v1";
const url = () => [apiPath, "login"].join("/");

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(url(), values);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        authContext.logIn();
        navigate("/");
      } catch {
        setAuthFailed(true);
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={image} className="rounded-circle" alt="Вход" />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <fieldset>
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      name="username"
                      autocomplete="username"
                      required
                      placeholder="Ваш ник"
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      name="password"
                      autocomplete="current-password"
                      required
                      placeholder="Пароль"
                      type="password"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      Неверные имя пользователя или пароль
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                  >
                    Войти
                  </Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
