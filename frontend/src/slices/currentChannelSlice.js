import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChannel: null,
};

const currentChannelSlice = createSlice({
  name: "currentChannel",
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export const { setCurrentChannel } = currentChannelSlice.actions;
export default currentChannelSlice.reducer;
