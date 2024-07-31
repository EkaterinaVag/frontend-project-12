import { Modal } from 'react-bootstrap';
import ModalForm from './ModalForm';
import ModalInput from './ModalInput';

const ModalComponent = ({
  onHide,
  onSubmit,
  titleKey,
  submitLabelKey,
  isLoading,
  t,
  formik,
  inputRef,
}) => (
  <Modal show centered>
    <Modal.Header closeButton onHide={onHide}>
      <Modal.Title>{t(titleKey)}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <ModalForm
        onHide={onHide}
        onSubmit={onSubmit}
        submitLabelKey={submitLabelKey}
        isLoading={isLoading}
        t={t}
      >
        {titleKey !== 'modals.delete' ? (
          <ModalInput formik={formik} inputRef={inputRef} />
        ) : null}

      </ModalForm>
    </Modal.Body>
  </Modal>
);

export default ModalComponent;
