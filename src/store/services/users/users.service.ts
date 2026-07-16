import { BaseApi } from 'rise-core-frontend';

/**
 * UserService provides methods for handling user-related operations
 * such as fetching all users and creating a new user through API endpoints.
 */
export class UserService extends BaseApi {
  user_info(userId: string) {
    return this.apiService.invoke(this.applicationContext.getApiConfig().USER.INFO, { userId });
  }
}
