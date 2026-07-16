import * as Constants from './constants';
import { establishmentServiceInstance } from './establishment.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';

const listQueries = (args: QUERIES.QueryPayload<MODELS.IEstablishment[]>) => {
  const { queryOptions } = args;

  return QUERIES.useCustomQuery<undefined, undefined, MODELS.IEstablishment[]>({
    queryKey: [Constants.ESTABLISHMENT_KEYS.LIST],
    queryFn: () => establishmentServiceInstance().get_all_establishment(),
    options: queryOptions,
  });
};

const createEstablishmentMutation = (
  args: QUERIES.MutationPayload<MODELS.ICreateEstablishment>,
) => {
  return QUERIES.useCustomMutation<MODELS.ICreateEstablishment, undefined>({
    mutationKey: [Constants.ESTABLISHMENT_KEYS.CREATE_ESTABLISHMENT],
    mutationFn: ({ payload }) => establishmentServiceInstance().create_establishment(payload!),
    options: args.mutationOptions,
  });
};

export { listQueries, createEstablishmentMutation };
