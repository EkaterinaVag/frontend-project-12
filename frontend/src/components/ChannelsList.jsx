import Spinner from './Spinner';
import ChannelItem from './ChannelItem';
import DropdownMenu from './DropdownMenu';

const ChannelsList = ({ channels, isLoading }) => (
  <>
    {isLoading && <Spinner />}
    {channels
      && channels.map((channel) => (
        <li className="nav-item w-100" key={channel.id}>
          <div role="group" className="d-flex dropdown btn-group">
            {!channel.removable && <ChannelItem channel={channel} />}
            {channel.removable && <DropdownMenu channel={channel} />}
          </div>
        </li>
      ))}
  </>
);

export default ChannelsList;
