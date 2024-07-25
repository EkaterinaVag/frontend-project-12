import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import image from "../assets/image.jpg";
import { login } from "../slices/authSlice";

const apiPath = "/api/v1";
const url = () => [apiPath, "login"].join("/");

const LoginPage = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [authFailed, setAuthFailed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

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
        const token = res.data.token;
        const username = res.data.username;
        dispatch(login({ token, username }));
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
                <img src={image} className="rounded-circle" alt={t("loginPage.img")} />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <fieldset>
                  <h1 className="text-center mb-4">{t("buttons.login")}</h1>
                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      name="username"
                      autoComplete="username"
                      required
                      placeholder={t("loginPage.username")}
                      id="username"
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      isInvalid={authFailed}
                      ref={inputRef}
                    />
                    <Form.Label htmlFor="username">
                      {t("loginPage.username")}
                    </Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder={t("loginPage.password")}
                      type="password"
                      id="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      isInvalid={authFailed}
                    />
                    <Form.Label htmlFor="password">
                      {t("loginPage.password")}
                    </Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {t("loginPage.error")}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="w-100 mb-3"
                  >
                    {t("buttons.login")}
                  </Button>
                </fieldset>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t("loginPage.exist")}</span>{" "}
                <a href="/signup">{t("loginPage.registration")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
