import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { setCurrentChannel } from '../../store/slices/currentChannelSlice';
import {
  useGetChannelsQuery,
  useRemoveChannelMutation,
} from '../../api/chatApi';

const RemoveChannelModal = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedChannel = useSelector((state) => state.modal.selectedChannel);
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();

  const { data: channels } = useGetChannelsQuery();
  const generalChannel = channels[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await removeChannel(selectedChannel.id);
      dispatch(setCurrentChannel(generalChannel));
      toast.success(t('toastsTexts.remove'));
      onHide();
    } catch (err) {
      toast.error(t('toastsTexts.error'));
    }
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.delete')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{t('modals.confirm')}</p>
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: 'flex', justifyContent: 'flex-end', gap: '5px' }}
          >
            <Button variant="secondary" onClick={onHide}>
              {t('buttons.cancel')}
            </Button>
            <Button variant="danger" type="submit" disabled={isLoading}>
              {t('buttons.remove')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
