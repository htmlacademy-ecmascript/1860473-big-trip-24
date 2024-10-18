import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class OffersModel extends Observable{
  #pointsApiService = null;
  #offer = [];

  constructor({pointsApiService}){
    super();
    this.#pointsApiService = pointsApiService;
  }

  get offers(){
    return this.#offer;
  }

  async init(){
    try{
      const offers = await this.#pointsApiService.offers;
      this.#offer = offers;
    } catch(err){
      this._notify(UpdateType.FAILED);
    }
  }

  getOfferByType(type) {
    return this.#offer.find((item) => item.type === type);
  }

  getOfferById(type, itemId) {
    const offersType = this.getOfferByType(type);
    return offersType.offers.filter((item) => itemId.find((id) => item.id === id));
  }

}
