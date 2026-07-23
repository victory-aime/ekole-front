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
  PROFILE: `${APP_ROUTES.DASHBOARD}/profile`,
};
