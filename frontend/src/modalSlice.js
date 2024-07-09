import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddChannelModal: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAddChannelModal: (state) => {
      state.showAddChannelModal = true;
    },
    closeAddChannelModal: (state) => {
      state.showAddChannelModal = false;
    },
  },
});

export const { openAddChannelModal, closeAddChannelModal } = modalSlice.actions;
export default modalSlice.reducer;
