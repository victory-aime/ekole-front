import { ApiActionProps, APIObjectType, createApiAction } from 'rise-core-frontend';

const APIS_ROUTES_MODULES_PATH = {
  AUTH: '/auth',
  USER: '/users',
  ESTABLISHMENT: '/establishment',
};

export const APIS = (baseUrl?: string) => {
  const api = (args: Omit<ApiActionProps, 'baseUrl'>): APIObjectType =>
    createApiAction({ ...args, baseUrl });

  return {
    AUTH: {
      SEND_EMAIL_VERIFICATION: api({
        path: `${APIS_ROUTES_MODULES_PATH.AUTH}/send-email-verification`,
        method: 'POST',
        pathBase: 'UNSECURED_API',
      }),
    },
    USER: {
      INFO: api({
        path: `${APIS_ROUTES_MODULES_PATH.USER}/info`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
        handleErrorManually: false,
      }),
    },
    ESTABLISHMENT: {
      LIST: api({
        path: `${APIS_ROUTES_MODULES_PATH.ESTABLISHMENT}/list`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
    },
  };
};
