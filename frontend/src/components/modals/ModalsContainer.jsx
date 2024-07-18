import { useDispatch, useSelector } from "react-redux";
import RenameChannelModal from "./RenameChannelModal";
import RemoveChannelModal from "./RemoveChannelModal";
import AddChannelModal from "./AddChannelModal";
import {
  useRenameChannelMutation,
  useRemoveChannelMutation,
  useAddChannelMutation,
} from "../../api/chatApi";
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
  const [removeChannel] = useRemoveChannelMutation();
  const [renameChannel] = useRenameChannelMutation();
  const [addChannel] = useAddChannelMutation();

  return (
    <>
      {showAddChannelModal && (
        <AddChannelModal
          onHide={() => dispatch(closeAddChannelModal())}
          addChannel={addChannel}
        />
      )}
      {showRemoveChannelModal && (
        <RemoveChannelModal
          onHide={() => dispatch(closeRemoveChannelModal())}
          removeChannel={removeChannel}
          channel={channel}
        />
      )}
      {showRenameChannelModal && (
        <RenameChannelModal
          onHide={() => dispatch(closeRenameChannelModal())}
          renameChannel={renameChannel}
          channel={channel}
        />
      )}
    </>
  );
};

export default ModalsContainer;
