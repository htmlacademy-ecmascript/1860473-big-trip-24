import {offer} from '../mock/offer.js';

export default class OffersModel {

  #offer = offer;

  get offers(){
    return this.#offer;
  }

  getOfferByType(type) {
    return this.#offer.find((item) => item.type === type);
  }

  getOfferById(type, itemId) {
    const offersType = this.getOfferByType(type);
    return offersType.offers.filter((item) => itemId.find((id) => item.id === id));
  }

}
