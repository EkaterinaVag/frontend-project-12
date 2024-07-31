/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: null,
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
    renameCurrentChannel: (state, action) => {
      if (state.currentChannel) {
        state.currentChannel.name = action.payload;
      }
    },
  },
});

export const { setCurrentChannel, renameCurrentChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
