import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { setCurrentChannel } from '../../store/slices/currentChannelSlice';
import { getSelectedChannel } from '../../store/slices/modalSelectors';
import { useGetChannelsQuery, useRemoveChannelMutation } from '../../api/chatApi';
import ModalComponent from './ModalComponent';

const RemoveChannelModal = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectedChannel = useSelector(getSelectedChannel);
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
    <ModalComponent
      onHide={onHide}
      onSubmit={handleSubmit}
      titleKey="modals.delete"
      submitLabelKey="buttons.remove"
      isLoading={isLoading}
      t={t}
    >
      <p>{t('modals.confirm')}</p>
    </ModalComponent>
  );
};

export default RemoveChannelModal;
