import { useDispatch, useSelector } from 'react-redux';

import RenameChannelModal from './RenameChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import AddChannelModal from './AddChannelModal';
import { closeRenameChannelModal, closeRemoveChannelModal, closeAddChannelModal } from '../../store/slices/modalSlice';
import { getShowAddModal, getShowRemoveModal, getShowRenameModal } from '../../store/slices/modalSelectors';

const ModalsContainer = () => {
  const dispatch = useDispatch();

  const showRemoveChannelModal = useSelector(getShowRemoveModal);
  const showRenameChannelModal = useSelector(getShowRenameModal);
  const showAddChannelModal = useSelector(getShowAddModal);

  return (
    <>
      {showAddChannelModal && (
        <AddChannelModal onHide={() => dispatch(closeAddChannelModal())} />
      )}
      {showRemoveChannelModal && (
        <RemoveChannelModal
          onHide={() => dispatch(closeRemoveChannelModal())}
        />
      )}
      {showRenameChannelModal && (
        <RenameChannelModal
          onHide={() => dispatch(closeRenameChannelModal())}
        />
      )}
    </>
  );
};

export default ModalsContainer;
