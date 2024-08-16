import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentChannel } from '../store/slices/currentChannelSlice';
import getCurrentChannel from '../store/slices/currentChannelSelectors';

const ChannelItem = ({ channel }) => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(getCurrentChannel);

  return (
    <Button
      variant={
        currentChannel && currentChannel.id === channel.id ? 'secondary' : ''
      }
      onClick={() => dispatch(setCurrentChannel(channel))}
      className="w-100 rounded-0 text-start text-truncate"
      title={channel.name}
    >
      <span className="me-1">#</span>
      {channel.name}
    </Button>
  );
};

export default ChannelItem;
