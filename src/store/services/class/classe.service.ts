import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/';

export class ClasseService extends BaseApi {
  get_all_classes(data?: MODELS.IClassFilter) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().CLASS.LIST,
      {},
      { params: data },
    );
  }
}
