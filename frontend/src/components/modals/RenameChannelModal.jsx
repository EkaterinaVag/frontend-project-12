import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Modal, FormGroup, FormControl, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import channelNameValidate from "../../channelNameValidate";
import {
  useGetChannelsQuery,
  useRenameChannelMutation,
} from "../../api/chatApi";

const RenameChannelModal = ({ onHide }) => {
  const { t } = useTranslation();
  const selectedChannel = useSelector((state) => state.modal.selectedChannel);
  const inputRef = useRef(null);
  const [renameChannel, { isLoading }] = useRenameChannelMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels?.map((channel) => channel.name) || [];

  const formik = useFormik({
    validationSchema: channelNameValidate(channelNames, t),
    initialValues: {
      name: selectedChannel.name,
    },
    onSubmit: (values) => {
      renameChannel({ name: values.name, id: selectedChannel.id });
      onHide();
    },
  });

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t("modals.rename")}</Modal.Title>
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
              marginTop: "15px",
            }}
          >
            <Button variant="secondary" onClick={onHide}>
              {t("buttons.cancel")}
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {t("buttons.send")}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
