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
  children,
}) => (
  <Modal show centered>
    <Modal.Header closeButton onHide={onHide}>
      <Modal.Title>{t(titleKey)}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {children}
      <ModalForm
        onHide={onHide}
        onSubmit={onSubmit}
        submitLabelKey={submitLabelKey}
        isLoading={isLoading}
        t={t}
      >
        {titleKey !== 'modals.delete' ? (
          <ModalInput formik={formik} inputRef={inputRef} t={t} />
        ) : null}

      </ModalForm>
    </Modal.Body>
  </Modal>
);

export default ModalComponent;
