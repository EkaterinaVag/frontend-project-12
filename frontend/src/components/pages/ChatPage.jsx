import MessageContainer from '../MessageContainer';
import ChannelContainer from '../ChannelContainer';
import useAuth from '../../hooks/useAuth';

const ChatPage = () => {
  useAuth();

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelContainer />
        <MessageContainer />
      </div>
    </div>
  );
};

export default ChatPage;
