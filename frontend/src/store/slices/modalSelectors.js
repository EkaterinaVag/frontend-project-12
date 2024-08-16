const getShowAddModal = (state) => state.modal.showAddChannelModal;

const getShowRenameModal = (state) => state.modal.showRenameChannelModal;

const getShowRemoveModal = (state) => state.modal.showRemoveChannelModal;

const getSelectedChannel = (state) => state.modal.selectedChannel;

export {
  getShowAddModal, getShowRenameModal, getShowRemoveModal, getSelectedChannel,
};
