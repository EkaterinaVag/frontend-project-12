import { useDispatch, useSelector } from "react-redux";
import { Dropdown, ButtonGroup } from "react-bootstrap";
import ChannelItem from "./ChannelItem";
import {
  openRenameChannelModal,
  openRemoveChannelModal,
} from "../slices/modalSlice";

const DropdownMenu = ({ channel }) => {
  const dispatch = useDispatch();

  const currentChannel = useSelector(
    (state) => state.currentChannel.currentChannel
  );

  const handleRemoveChannel = () => {
    dispatch(openRemoveChannelModal(channel));
  };

  const handleRenameChannel = () => {
    dispatch(openRenameChannelModal(channel));
  };

  return (
    <Dropdown as={ButtonGroup} className="col-4 col-md-2">
      <ChannelItem channel={channel} />
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

export default DropdownMenu;
