import { useDispatch } from "react-redux";
import { Dropdown, Button, ButtonGroup } from "react-bootstrap";
import {
  openRenameChannelModal,
  openRemoveChannelModal,
} from "../slices/modalSlice";

const ChannelManagement = ({ currentChannel, setChannel, channel }) => {
  const dispatch = useDispatch();

  const handleRemoveChannel = () => {
    dispatch(openRemoveChannelModal(channel));
  };

  const handleRenameChannel = () => {
    dispatch(openRenameChannelModal(channel));
  };

  return (
    <Dropdown as={ButtonGroup} className="col-4 col-md-2">
      <Button
        variant={currentChannel.id === channel.id ? "secondary" : ""}
        onClick={() => setChannel(channel)}
      >
        <span className="me-1">#</span>
        <span className="text-truncate" title={channel.name}>
          {channel.name}
        </span>
      </Button>
      <Dropdown.Toggle
        split
        variant={currentChannel.id === channel.id ? "secondary" : ""}
        title={<span className="visually-hidden">Управление каналом</span>}
        id="channelDropdown"
      ></Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemoveChannel}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={handleRenameChannel}>
          Переименовать
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelManagement;
