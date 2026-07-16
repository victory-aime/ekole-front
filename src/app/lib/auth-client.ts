import { createAuthClient } from 'better-auth/react';
import {
  inferAdditionalFields,
  lastLoginMethodClient,
  usernameClient,
} from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL,
  fetchOptions: {
    credentials: 'include',
  },
  plugins: [
    usernameClient(),
    lastLoginMethodClient(),
    inferAdditionalFields({
      session: {
        permissions: {
          type: 'json',
          input: false,
        },
      },
      user: {
        role: {
          type: 'string',
          input: false,
        },
      },
    }),
  ],
});
