import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Modal, FormGroup, FormControl, Button } from "react-bootstrap";

const RenameChannelModal = ({ onHide, renameChannel, channel }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: channel.name,
    },
    onSubmit: (values) => {
      renameChannel(values.name, channel.id);
      onHide();
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
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
              data-testid="input-name"
              name="name"
            />
          </FormGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "5px",
              marginTop: "15px",
            }}
          >
            <Button variant="secondary" onClick={onHide}>
              Отменить
            </Button>
            <Button variant="primary" type="submit">
              Отправить
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
