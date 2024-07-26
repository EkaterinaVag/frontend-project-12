import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: null,
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannel = action.payload;
    },
  },
});

export const { setCurrentChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
