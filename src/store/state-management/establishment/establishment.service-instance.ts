import { applicationInstance } from 'rise-core-frontend';
import { EstablishmentService } from '_store/services';

export const establishmentServiceInstance = () => {
  const context = applicationInstance.getContext();
  if (!context) {
    throw new Error('[Establishment] No context found.');
  }
  return new EstablishmentService(context);
};
