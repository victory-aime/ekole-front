export const APP_ROUTES = {
  ROOT: '/',
  REDIRECT: '/redirect',
  SIGN_IN: '/signin',
  PROTECTED: '/not-authenticated',
  DASHBOARD: '/dashboard',
};

export const DASHBOARD_ROUTES = {
  HOME: `${APP_ROUTES.DASHBOARD}`,
  ESTABLISHMENT: `${APP_ROUTES.DASHBOARD}/establishment`,
  SCHOOL_YEAR: `${APP_ROUTES.DASHBOARD}/school-year`,
  CLASS: {
    LIST: `${APP_ROUTES.DASHBOARD}/class`,
    DETAILS: `${APP_ROUTES.DASHBOARD}/class/details`,
  },
  STUDENTS: `${APP_ROUTES.DASHBOARD}/students`,
  PROFILE: `${APP_ROUTES.DASHBOARD}/profile`,
};

export const ROUTE_PARENTS: Record<string, string> = {
  [DASHBOARD_ROUTES.CLASS.DETAILS]: DASHBOARD_ROUTES.CLASS.LIST,
};
