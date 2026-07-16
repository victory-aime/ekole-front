import { BaseApi } from 'rise-core-frontend';

/**
 * AuthService provides methods for handling authentication-related operations
 * such as registering a new user and sending verification emails.
 */
export class AuthService extends BaseApi {
  send_verification_email(data: { email: string }) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().AUTH.SEND_EMAIL_VERIFICATION,
      data,
    );
  }
}
