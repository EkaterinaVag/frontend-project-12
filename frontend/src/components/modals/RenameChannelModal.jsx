import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import channelNameValidate from '../../channelNameValidate';
import ModalComponent from './ModalComponent';
import {
  useGetChannelsQuery,
  useRenameChannelMutation,
} from '../../api/chatApi';

const RenameChannelModal = ({ onHide }) => {
  const { t } = useTranslation();

  const selectedChannel = useSelector((state) => state.modal.selectedChannel);
  const [renameChannel, { isLoading }] = useRenameChannelMutation();

  const inputRef = useRef(null);
  useEffect(() => {
    setTimeout(() => inputRef.current.select());
  }, []);

  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels?.map((channel) => channel.name) || [];

  const formik = useFormik({
    validationSchema: channelNameValidate(channelNames, t),
    initialValues: {
      name: selectedChannel.name,
    },
    onSubmit: async ({ name }) => {
      try {
        const filtredName = filter.clean(name);
        await renameChannel({ name: filtredName, id: selectedChannel.id });
        toast.success(t('toastsTexts.rename'));
        onHide();
      } catch (err) {
        toast.error(t('toastsTexts.error'));
      }
    },
  });

  return (
    <ModalComponent
      onHide={onHide}
      formik={formik}
      titleKey="modals.rename"
      submitLabelKey="buttons.send"
      isLoading={isLoading}
      t={t}
      inputRef={inputRef}
    />
  );
};

export default RenameChannelModal;
