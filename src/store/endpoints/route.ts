import { SCHOOL_YEARS_KEYS } from '_store/state-management/school-year';
import { ApiActionProps, APIObjectType, createApiAction } from 'rise-core-frontend';

const APIS_ROUTES_MODULES_PATH = {
  AUTH: '/auth',
  USER: '/users',
  ESTABLISHMENT: '/establishment',
  SCHOOL_YEARS: '/school-year',
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
      CREATE: api({
        path: `${APIS_ROUTES_MODULES_PATH.ESTABLISHMENT}/create-establishment`,
        method: 'POST',
        pathBase: 'SECURED_API',
      }),
    },
    SCHOOL_YEARS: {
      LIST: api({
        path: `${APIS_ROUTES_MODULES_PATH.SCHOOL_YEARS}/list`,
        method: 'GET',
        pathBase: 'SECURED_API',
        showResponse: false,
      }),
      CREATE: api({
        path: `${APIS_ROUTES_MODULES_PATH.SCHOOL_YEARS}/create-year`,
        method: 'POST',
        pathBase: 'SECURED_API',
      }),
      DELETE: api({
        path: `${APIS_ROUTES_MODULES_PATH.SCHOOL_YEARS}/delete-year`,
        method: 'DELETE',
        pathBase: 'SECURED_API',
      }),
      UPDATE_TERMS: api({
        path: `${APIS_ROUTES_MODULES_PATH.SCHOOL_YEARS}/update-terms`,
        method: 'POST',
        pathBase: 'SECURED_API',
      }),
    },
  };
};
