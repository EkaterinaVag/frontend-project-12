import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import channelNameValidate from '../../channelNameValidate';
import { useGetChannelsQuery, useAddChannelMutation } from '../../api/chatApi';
import { setCurrentChannel } from '../../slices/currentChannelSlice';
import ModalComponent from './ModalComponent';

const AddChannelModal = ({ onHide }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [addChannel, { isLoading }] = useAddChannelMutation();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { data: channels } = useGetChannelsQuery();
  const channelNames = channels?.map((channel) => channel.name) || [];

  const formik = useFormik({
    validationSchema: channelNameValidate(channelNames, t),
    initialValues: {
      name: '',
    },
    onSubmit: async ({ name }) => {
      try {
        const filtredName = filter.clean(name);
        const { data } = await addChannel(filtredName);
        dispatch(setCurrentChannel(data));
        toast.success(t('toastsTexts.add'));
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
      titleKey="modals.addChannel"
      submitLabelKey="buttons.add"
      isLoading={isLoading}
      t={t}
      inputRef={inputRef}
    />
  );
};

export default AddChannelModal;
