import * as Constants from './constants';
import { schoolYearServiceInstance } from './school-year.service-instance';
import { MODELS } from '_types/index';
import { QUERIES } from 'rise-core-frontend';

const schoolYearListQueries = (args: QUERIES.QueryPayload<MODELS.ISchoolYears[]>) => {
  const { queryOptions } = args;

  return QUERIES.useCustomQuery<undefined, undefined, MODELS.ISchoolYears[]>({
    queryKey: [Constants.SCHOOL_YEARS_KEYS.LIST_SCHOOL],
    queryFn: () => schoolYearServiceInstance().get_all_school_year(),
    options: queryOptions,
  });
};

const createSchoolYearMutation = (args: QUERIES.MutationPayload<MODELS.ICreateSchoolYear>) => {
  return QUERIES.useCustomMutation<MODELS.ICreateSchoolYear, undefined>({
    mutationKey: [Constants.SCHOOL_YEARS_KEYS.CREATE_SCHOOL_YEAR],
    mutationFn: ({ payload }) => schoolYearServiceInstance().create_school_year(payload!),
    options: args.mutationOptions,
  });
};

const deleteSchoolYearMutation = (args: QUERIES.MutationPayload<MODELS.IDeleteSchoolYear>) => {
  return QUERIES.useCustomMutation<MODELS.IDeleteSchoolYear, undefined>({
    mutationKey: [Constants.SCHOOL_YEARS_KEYS.DELETE_SCHOOL_YEAR],
    mutationFn: ({ payload }) => schoolYearServiceInstance().delete_school_year(payload!),
    options: args.mutationOptions,
  });
};

const updateTermsMutation = (
  args: QUERIES.MutationPayload<MODELS.IUpdateTerms, undefined, { trimestre_id: string }>,
) => {
  return QUERIES.useCustomMutation<MODELS.IUpdateTerms, undefined, { trimestre_id: string }>({
    mutationKey: [Constants.SCHOOL_YEARS_KEYS.UPDATE_TERMS],
    mutationFn: ({ payload, params }) =>
      schoolYearServiceInstance().update_terms_school(payload!, params?.trimestre_id!),
    options: args.mutationOptions,
  });
};

export {
  schoolYearListQueries,
  createSchoolYearMutation,
  updateTermsMutation,
  deleteSchoolYearMutation,
};
