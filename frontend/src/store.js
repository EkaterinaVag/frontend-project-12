import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { chatApi } from './api/chatApi';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import currentChannelReducer from './slices/currentChannelSlice';

const store = configureStore({
  reducer: {
    [chatApi.reducerPath]: chatApi.reducer,
    auth: authReducer,
    modal: modalReducer,
    currentChannel: currentChannelReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});

setupListeners(store.dispatch);

export default store;
