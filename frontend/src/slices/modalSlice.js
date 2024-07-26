import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddChannelModal: false,
  showRenameChannelModal: false,
  showRemoveChannelModal: false,
  selectedChannel: null,
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
    openRenameChannelModal: (state, action) => {
      state.showRenameChannelModal = true;
      state.selectedChannel = action.payload;
    },
    closeRenameChannelModal: (state) => {
      state.showRenameChannelModal = false;
      state.selectedChannel = null;
    },
    openRemoveChannelModal: (state, action) => {
      state.showRemoveChannelModal = true;
      state.selectedChannel = action.payload;
    },
    closeRemoveChannelModal: (state) => {
      state.showRemoveChannelModal = false;
      state.selectedChannel = null;
    },
  },
});

export const {
  openAddChannelModal,
  closeAddChannelModal,
  openRemoveChannelModal,
  closeRemoveChannelModal,
  openRenameChannelModal,
  closeRenameChannelModal,
} = modalSlice.actions;
export default modalSlice.reducer;
