import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { setupSocket } from '../api/soket';
import MessageContainer from './MessageContainer';
import ChannelContainer from './ChannelContainer';

const ChatPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const cleanup = setupSocket();
    return cleanup();
  }, []);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

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
