import signupImg from "../assets/signupImg.jpg";
import * as yup from "yup";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { login } from "../slices/authSlice";

const apiPath = "/api/v1";
const url = () => [apiPath, "signup"].join("/");

const SignupPage = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [registrationFailed, setRegistrationFailed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shrema = yup.object().shape({
    username: yup
      .string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .required("Обязательное поле"),
    password: yup
      .string()
      .min(3, "Не менее 6  символов")
      .required("Обязательное поле"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
      .required("Обязательное поле"),
  });

  const formik = useFormik({
    validationSchema: shrema,
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ username, password }) => {
      setRegistrationFailed(false);
      try {
        const newUser = { username, password };
        const res = await axios.post(url(), newUser);
        const token = res.data.token;
        dispatch(login({ token, username }));
        navigate('/');
      } catch (err) {
        if (err.isAxiosError && err.response.status === 409) {
          setErrorMessage("Такой пользователь уже существует");
          setRegistrationFailed(true);
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={signupImg}
                  className="rounded-circle"
                  alt="Регистрация"
                />
              </div>
              <Form className="w-50" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder="От 3 до 20 символов"
                    name="username"
                    autoComplete="username"
                    required
                    id="username"
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.username && !!formik.errors.username) || registrationFailed}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    placeholder="Не менее 6 символов"
                    name="password"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="password"
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.password && !!formik.errors.password) || registrationFailed}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    placeholder="Пароли должны совпадать"
                    name="confirmPassword"
                    required
                    autoComplete="new-password"
                    type="password"
                    id="confirmPassword"
                    onBlur={formik.handleBlur}
                    isInvalid={(formik.touched.confirmPassword && !!formik.errors.confirmPassword) || registrationFailed}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                    {errorMessage}
                  </Form.Control.Feedback>
                  <Form.Label htmlFor="confirmPassword">
                    Подтвердите пароль
                  </Form.Label>
                </Form.Group>
                <Button
                  type="submit"
                  className="w-100 mt-3"
                  variant="outline-primary"
                >
                  Зарегистрироваться
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
