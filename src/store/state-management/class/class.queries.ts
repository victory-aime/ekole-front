import * as Constants from './constants';
import { classServiceInstance } from './class.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';

const classListQueries = (
  args: QUERIES.QueryPayload<MODELS.IClass[], undefined, { data?: MODELS.IClassFilter }>,
) => {
  const { queryOptions, params } = args;

  return QUERIES.useCustomQuery<undefined, undefined, MODELS.IClass[]>({
    queryKey: [Constants.CLASS_KEYS.LIST_CLASS, params],
    queryFn: () => classServiceInstance().get_all_classes(params?.data!),
    options: queryOptions,
  });
};

// const createSchoolYearMutation = (args: QUERIES.MutationPayload<MODELS.ICreateSchoolYear>) => {
//   return QUERIES.useCustomMutation<MODELS.ICreateSchoolYear, undefined>({
//     mutationKey: [Constants.SCHOOL_YEARS_KEYS.CREATE_SCHOOL_YEAR],
//     mutationFn: ({ payload }) => classServiceInstance().create_school_year(payload!),
//     options: args.mutationOptions,
//   });
// };
//
// const deleteSchoolYearMutation = (args: QUERIES.MutationPayload<MODELS.IDeleteSchoolYear>) => {
//   return QUERIES.useCustomMutation<MODELS.IDeleteSchoolYear, undefined>({
//     mutationKey: [Constants.SCHOOL_YEARS_KEYS.DELETE_SCHOOL_YEAR],
//     mutationFn: ({ payload }) => classServiceInstance().delete_school_year(payload!),
//     options: args.mutationOptions,
//   });
// };
//
// const updateTermsMutation = (
//   args: QUERIES.MutationPayload<MODELS.IUpdateTerms, undefined, { trimestre_id: string }>,
// ) => {
//   return QUERIES.useCustomMutation<MODELS.IUpdateTerms, undefined, { trimestre_id: string }>({
//     mutationKey: [Constants.SCHOOL_YEARS_KEYS.UPDATE_TERMS],
//     mutationFn: ({ payload, params }) =>
//       classServiceInstance().update_terms_school(payload!, params?.trimestre_id!),
//     options: args.mutationOptions,
//   });
// };

export { classListQueries };
