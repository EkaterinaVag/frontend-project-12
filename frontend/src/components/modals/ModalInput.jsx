import { FormGroup, FormControl } from 'react-bootstrap';

const ModalInput = ({
  formik,
  inputRef,
}) => (
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
);

export default ModalInput;
