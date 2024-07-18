import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChannel: { id: "1", name: "general", removable: false },
};

const channelSlice = createSlice({
  name: "currentChannel",
  initialState,
  reducers: {
    setCurrentChannel: (state, action) => {
      state.currentChannel = action.payload;
    },
  },
});

export const { setCurrentChannel } = channelSlice.actions;
export default channelSlice.reducer;
