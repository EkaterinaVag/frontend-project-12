import * as yup from "yup";

const channelNameValidate = (channelNames, t) => {
  return yup.object().shape({
    name: yup
      .string()
      .min(3, t("validate.max"))
      .max(20, t("validate.max"))
      .notOneOf(channelNames, t("validate.unique"))
      .required(t("validate.required")),
  });
};

export default channelNameValidate;
