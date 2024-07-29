import React, { useRef, useEffect } from 'react';
import {
  Form, FormControl, FormGroup, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MessageForm = ({ handleSubmit, isLoading }) => {
  const { t } = useTranslation();

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
        <FormGroup className="has-validation d-flex align-items-center">
          <FormControl
            name="body"
            aria-label={t('messages.newMessage')}
            placeholder={t('messages.printMessage')}
            className="border-0 p-6 ps-2 flex-grow-1"
            ref={inputRef}
          />
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            className="ml-2"
          >
            {t('buttons.send')}
            <span className="visually-hidden">
              {t('buttons.send')}
            </span>
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default MessageForm;
