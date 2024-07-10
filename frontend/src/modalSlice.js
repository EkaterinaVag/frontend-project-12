import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAddChannelModal: false,
  showRenameChannelModal: false,
  showRemoveChannelModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAddChannelModal: (state) => {
      state.showAddChannelModal = true;
    },
    closeAddChannelModal: (state) => {
      state.showAddChannelModal = false;
    },
    openRenameChannelModal: (state) => {
      state.showRenameChannelModal = true;
    },
    closeRenameChannelModal: (state) => {
      state.showRenameChannelModal = false;
    },
    openRemoveChannelModal: (state) => {
      state.showRemoveChannelModal = true;
    },
    closeRemoveChannelModal: (state) => {
      state.showRemoveChannelModal = false;
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
