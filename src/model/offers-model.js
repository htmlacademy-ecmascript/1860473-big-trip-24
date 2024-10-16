export default class OffersModel {
  #pointsApiService = null;
  #offer = [];

  constructor({pointsApiService}){
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
      return this.#offer;
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
