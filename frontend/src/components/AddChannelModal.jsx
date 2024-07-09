import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Modal, FormGroup, FormControl } from "react-bootstrap";
import * as yup from "yup";
import { useGetChannelsQuery } from "../api/chatApi";

const AddChannelModal = ({ onHide, addChannel }) => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels?.map((channel) => channel.name) || [];

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .notOneOf(channelNames, "Должно быть уникальным")
      .required("Обязательное поле"),
  });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      addChannel(values.name);
      // setCurrentChannel(channels.find((channel) => channel.name === values.name))
      onHide();
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              data-testid="input-name"
              name="name"
            />
            {formik.touched.name && formik.errors.name && (
              <FormControl.Feedback type="invalid">
                {formik.errors.name}
              </FormControl.Feedback>
            )}
          </FormGroup>
          <button
            type="button"
            className="btn btn-secondary mt-2"
            aria-label="Отменить"
            onClick={onHide}
          >
            Отменить
          </button>
          <button type="submit" className="btn btn-primary mt-2">
            Добавить
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
