import * as yup from 'yup';

const signupFormValidate = (t) => yup.object().shape({
  username: yup
    .string()
    .min(3, t('validate.max'))
    .max(20, t('validate.max'))
    .required(t('validate.required')),
  password: yup
    .string()
    .min(6, t('validate.min'))
    .required(t('validate.required')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], t('validate.confPass'))
    .required(t('validate.required')),
});

export default signupFormValidate;
