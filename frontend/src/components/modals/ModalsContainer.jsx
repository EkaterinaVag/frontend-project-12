import { useDispatch, useSelector } from "react-redux";
import RenameChannelModal from "./RenameChannelModal";
import RemoveChannelModal from "./RemoveChannelModal";
import AddChannelModal from "./AddChannelModal";
import {
  closeRenameChannelModal,
  closeRemoveChannelModal,
  closeAddChannelModal,
} from "../../slices/modalSlice";

const ModalsContainer = ({ channel }) => {
  const dispatch = useDispatch();
  const showRemoveChannelModal = useSelector(
    (state) => state.modal.showRemoveChannelModal
  );
  const showRenameChannelModal = useSelector(
    (state) => state.modal.showRenameChannelModal
  );
  const showAddChannelModal = useSelector(
    (state) => state.modal.showAddChannelModal
  );

  return (
    <>
      {showAddChannelModal && (
        <AddChannelModal onHide={() => dispatch(closeAddChannelModal())} />
      )}
      {showRemoveChannelModal && (
        <RemoveChannelModal
          onHide={() => dispatch(closeRemoveChannelModal())}
          channel={channel}
        />
      )}
      {showRenameChannelModal && (
        <RenameChannelModal
          onHide={() => dispatch(closeRenameChannelModal())}
          channel={channel}
        />
      )}
    </>
  );
};

export default ModalsContainer;
