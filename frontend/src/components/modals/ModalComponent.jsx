import {
  Modal, FormGroup, FormControl, Button,
} from 'react-bootstrap';

const ModalComponent = ({
  onHide, formik, modalName, isLoading, t, inputRef,
}) => (
  <Modal show centered>
    <Modal.Header closeButton onHide={onHide}>
      <Modal.Title>{t(`modals.${modalName}`)}</Modal.Title>
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
            marginTop: '15px',
          }}
        >
          <Button variant="secondary" onClick={onHide}>
            {t('buttons.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {t('buttons.send')}
          </Button>
        </div>
      </form>
    </Modal.Body>
  </Modal>
);

export default ModalComponent;
