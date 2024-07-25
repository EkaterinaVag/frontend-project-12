import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentChannel } from "../../slices/currentChannelSlice";
import {
  useGetChannelsQuery,
  useRemoveChannelMutation,
} from "../../api/chatApi";

const RemoveChannelModal = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const selectedChannel = useSelector((state) => state.modal.selectedChannel);

  const { data: channels } = useGetChannelsQuery();
  const generalChannel = channels[0];

  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    removeChannel(selectedChannel.id);
    dispatch(setCurrentChannel(generalChannel));
    onHide();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t("modals.delete")}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{t("modals.confirm")}</p>
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}
          >
            <Button variant="secondary" onClick={onHide}>
              {t("buttons.cancel")}
            </Button>
            <Button variant="danger" type="submit" disabled={isLoading}>
              {t("buttons.delete")}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
