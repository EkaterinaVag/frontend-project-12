import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';

import channelNameValidate from '../../channelNameValidate';
import { useGetChannelsQuery, useAddChannelMutation } from '../../api/chatApi';
import { setCurrentChannel } from '../../slices/currentChannelSlice';

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
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              data-testid="input-name"
              name="name"
            />
            {formik.touched.name && formik.errors.name && (
              <FormControl.Feedback type="invalid">
                {formik.errors.name}
              </FormControl.Feedback>
            )}
          </FormGroup>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '5px',
              marginTop: '10px',
            }}
          >
            <Button variant="secondary" onClick={onHide}>
              {t('buttons.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {t('buttons.add')}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
