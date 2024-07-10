import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RenameChannelModal from "./RenameChannelModal";
import RemoveChannelModal from "./RemoveChannelModal";
import {
  useRenameChannelMutation,
  useRemoveChannelMutation,
} from "../api/chatApi";
import {
  openRenameChannelModal,
  closeRenameChannelModal,
  openRemoveChannelModal,
  closeRemoveChannelModal,
} from "../modalSlice";

const ChannelManagement = ({ currentChannel, channel }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [renameChannel] = useRenameChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();

  const showRenameChannelModal = useSelector(
    (state) => state.modal.showRenameChannelModal
  );
  const showRemoveChannelModal = useSelector(
    (state) => state.modal.showRemoveChannelModal
  );

  return (
    <div className="dropdown">
      <button
        className={`btn dropdown-toggle ${
          currentChannel.id === channel.id ? "btn-secondary" : ""
        }`}
        type="button"
        id="channelDropdown"
        data-bs-toggle="dropdown"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <span className="visually-hidden">Управление каналом</span>
      </button>

      <ul
        className={`dropdown-menu ${isOpen ? "show" : ""}`}
        aria-labelledby="channelDropdown"
      >
        <li>
          <button className="dropdown-item" onClick={() => dispatch(openRemoveChannelModal())}>
            Удалить
          </button>
          {showRemoveChannelModal && (
            <RemoveChannelModal
              onHide={() => dispatch(closeRemoveChannelModal())}
              removeChannel={removeChannel}
              channel={channel}
            />
          )}
        </li>
        <li>
          <button className="dropdown-item" onClick={() => dispatch(openRenameChannelModal())}>
            Переименовать
          </button>
          {showRenameChannelModal && (
            <RenameChannelModal
              onHide={() => dispatch(closeRenameChannelModal())}
              renameChannel={renameChannel}
              channel={channel}
            />
          )}
        </li>
      </ul>
    </div>
  );
};

export default ChannelManagement;
