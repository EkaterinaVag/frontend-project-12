import { FormGroup, FormControl } from 'react-bootstrap';

const ModalInput = ({
  formik,
  inputRef,
  t,
}) => (
  <FormGroup>
    <FormControl
      required
      ref={inputRef}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.name}
      isInvalid={formik.touched.name && formik.errors.name}
      name="name"
      id="name"
    />
    <label className="visually-hidden" htmlFor="name">{t('modals.channelName')}</label>
    {formik.touched.name && formik.errors.name && (
      <FormControl.Feedback type="invalid">
        {formik.errors.name}
      </FormControl.Feedback>
    )}
  </FormGroup>
);

export default ModalInput;
