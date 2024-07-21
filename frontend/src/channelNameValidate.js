import * as yup from "yup";

const channelNameValidate = (channelNames) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .notOneOf(channelNames, "Должно быть уникальным")
      .required("Обязательное поле"),
  });
};

export default channelNameValidate;
