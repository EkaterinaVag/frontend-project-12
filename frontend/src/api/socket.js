import { io } from 'socket.io-client';
import { chatApi } from './chatApi';

const socket = io();
const handleNewMessage = (payload) => chatApi.endpoints.getMessage.initiate(payload);
const handleNewChannel = (payload) => chatApi.endpoints.getChannels.initiate(payload);
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
