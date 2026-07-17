import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/';

export class SchoolYearService extends BaseApi {
  get_all_school_year() {
    return this.apiService.invoke(this.applicationContext.getApiConfig().SCHOOL_YEARS.LIST);
  }

  create_school_year(data: MODELS.ICreateSchoolYear) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().SCHOOL_YEARS.CREATE,
      data,
      { params: { school_id: data.school_id } },
    );
  }

  delete_school_year(data: MODELS.IDeleteSchoolYear) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().SCHOOL_YEARS.DELETE,
      {},
      { params: { school_id: data.school_id, year_id: data.year_id } },
    );
  }

  update_terms_school(data: MODELS.IUpdateTerms, trimestre_id: string) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().SCHOOL_YEARS.UPDATE_TERMS,
      data,
      { params: { trimestre_id } },
    );
  }
}
