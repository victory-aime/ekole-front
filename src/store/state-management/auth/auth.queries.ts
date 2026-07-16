import * as Constants from './constants';
import { authServiceInstance } from './auth.service-instance';
import { QUERIES } from 'rise-core-frontend';

const sendEmailVerificationMutation = (args: QUERIES.MutationPayload<{ email: string }>) => {
  return QUERIES.useCustomMutation({
    mutationKey: [Constants.AUTH_KEYS.SEND_EMAIL_VERIFICATION],
    mutationFn: ({ payload }) => authServiceInstance().send_verification_email(payload!),
    options: args.mutationOptions,
  });
};

export { sendEmailVerificationMutation };
