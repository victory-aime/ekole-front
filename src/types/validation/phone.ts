import * as Yup from 'yup';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();

interface PhoneSchemaOptions {
  required?: boolean;
  requiredMessage?: string;
  invalidMessage?: string;
}

export const phoneSchema = ({
  required = true,
  requiredMessage = 'Numero de téléphone obligatoire',
  invalidMessage = 'Numero de telephone invalide',
}: PhoneSchemaOptions = {}) => {
  let schema = Yup.string().test('is-valid-phone', invalidMessage, (value) => {
    if (!value) {
      return !required;
    }
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(value));
    } catch {
      return false;
    }
  });
  if (required) {
    schema = schema.required(requiredMessage);
  }
  return schema;
};
