import React from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveChannelModal = ({ onHide, removeChannel, channel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    removeChannel(channel.id);
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
            <Button variant="danger" type="submit">
              Удалить
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
