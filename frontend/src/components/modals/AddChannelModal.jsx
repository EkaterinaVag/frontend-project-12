import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Modal, FormGroup, FormControl, Button } from "react-bootstrap";
import channelNameValidate from "../../channelNameValidate";
import { useGetChannelsQuery, useAddChannelMutation } from "../../api/chatApi";
import { setCurrentChannel } from "../../slices/currentChannelSlice";

const AddChannelModal = ({ onHide }) => {
  const [addChannel, { isLoading }] = useAddChannelMutation();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels?.map((channel) => channel.name) || [];

  const dispatch = useDispatch();

  const formik = useFormik({
    validationSchema: channelNameValidate(channelNames),
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      addChannel(values.name);
      const newChannel = channels?.find(
        (channel) => channel.name === values.name
      );
      dispatch(setCurrentChannel(newChannel));
      onHide();
    },
  });

  return (
    <Modal show centered>
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "5px",
              marginTop: "10px",
            }}
          >
            <Button variant="secondary" onClick={onHide}>
              Отменить
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              Добавить
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
