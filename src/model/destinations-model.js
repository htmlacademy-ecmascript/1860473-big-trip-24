export default class DestinationsModel {
  #pointsApiService = null;

  #destination = [];

  constructor({pointsApiService}){
    this.#pointsApiService = pointsApiService;
  }

  get destination(){
    return this.#destination;
  }

  async init(){
    try {
      const destination = await this.#pointsApiService.destinations;
      this.#destination = destination;
    } catch(err){
      return this.#destination;
    }

  }

  getDestinationById(id) {
    return this.#destination.find((item) => item.id === id);
  }

  getDestinationByName(name) {
    return this.#destination.find((item) => item.name === name);
  }

}
