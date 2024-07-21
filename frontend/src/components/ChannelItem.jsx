import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../slices/currentChannelSlice";

const ChannelItem = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(
    (state) => state.currentChannel.currentChannel
  );
  
  return (
    <Button
      variant={
        currentChannel && currentChannel.id === channel.id ? "secondary" : ""
      }
      onClick={() => dispatch(setCurrentChannel(channel))}
      className="w-100 rounded-0 text-start"
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

export default ChannelItem;
