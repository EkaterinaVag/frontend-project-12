import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../../slices/currentChannelSlice";
import {
  useGetChannelsQuery,
  useRemoveChannelMutation,
} from "../../api/chatApi";

const RemoveChannelModal = ({ onHide }) => {
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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Уверены?</p>
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}
          >
            <Button variant="secondary" onClick={onHide}>
              Отменить
            </Button>
            <Button variant="danger" type="submit" disabled={isLoading}>
              Удалить
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
