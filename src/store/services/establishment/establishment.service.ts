import { BaseApi } from 'rise-core-frontend';
import { MODELS } from '_types/';

export class EstablishmentService extends BaseApi {
  get_all_establishment() {
    return this.apiService.invoke(this.applicationContext.getApiConfig().ESTABLISHMENT.LIST);
  }

  create_establishment(data: MODELS.ICreateEstablishment) {
    return this.apiService.invoke(
      this.applicationContext.getApiConfig().ESTABLISHMENT.CREATE,
      data,
    );
  }
}
