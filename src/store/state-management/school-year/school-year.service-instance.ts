import { applicationInstance } from 'rise-core-frontend';
import { SchoolYearService } from '_store/services';

export const schoolYearServiceInstance = () => {
  const context = applicationInstance.getContext();
  if (!context) {
    throw new Error('[SchoolYearService] No context found.');
  }
  return new SchoolYearService(context);
};
