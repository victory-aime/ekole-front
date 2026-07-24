import { applicationInstance } from 'rise-core-frontend';
import { ClasseService } from '_store/services';

export const classServiceInstance = () => {
  const context = applicationInstance.getContext();
  if (!context) {
    throw new Error('[ClasseService] No context found.');
  }
  return new ClasseService(context);
};
