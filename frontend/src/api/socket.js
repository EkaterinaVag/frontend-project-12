import { io } from 'socket.io-client';
import { chatApi } from './chatApi';

const socket = io();
const handleNewMessage = () => {
  if (chatApi.endpoints && chatApi.endpoints.getMessage) {
    chatApi.endpoints.getMessage.invalidate();
  }
};

const handleNewChannel = (payload) => {
  if (chatApi.endpoints && chatApi.endpoints.getChannels) {
    chatApi.endpoints.getChannels.initiate(payload);
  }
};

const handleRemoveChannel = (payload) => chatApi.endpoints.getChannels.initiate(payload);
const handleRenameChannel = (payload) => chatApi.endpoints.getChannels.initiate(payload);

const setupSocket = () => {
  socket.on('newMessage', handleNewMessage);
  socket.on('newChannel', handleNewChannel);
  socket.on('removeChannel', handleRemoveChannel);
  socket.on('renameChannel', handleRenameChannel);

  return () => {
    socket.off('newMessage', handleNewMessage);
    socket.off('newChannel', handleNewChannel);
    socket.off('removeChannel', handleRemoveChannel);
    socket.off('renameChannel', handleRenameChannel);
  };
};

export default setupSocket;
