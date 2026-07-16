import { SidebarNavGroupProps } from '../types';
import { Icons } from '_components/custom';
import { DASHBOARD_ROUTES } from '_config/routes';

export const SIDEBAR_ROUTES: SidebarNavGroupProps[] = [
  {
    title: 'Gestion Immobiliers',
    icon: Icons.GridHome,
    links: [
      {
        path: DASHBOARD_ROUTES.HOME,
        label: 'SIDE_BAR.DASHBOARD',
        icon: Icons.Home,
      },
      {
        path: DASHBOARD_ROUTES.ESTABLISHMENT,
        label: 'Etablissements',
        icon: Icons.RiBuildingLine,
      },
      {
        path: DASHBOARD_ROUTES.SCHOOL_YEAR,
        label: 'Années scolaires',
        icon: Icons.Calendar,
      },
    ],
  },
  {
    title: 'Compte',
    icon: Icons.FaUsers,
    links: [{ label: 'Profil', path: DASHBOARD_ROUTES.PROFILE, icon: Icons.FaUsers }],
  },
];
