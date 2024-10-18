import Observable from '../framework/observable.js';
import { UpdateType } from '../const.js';

export default class DestinationsModel extends Observable {
  #pointsApiService = null;

  #destination = [];

  constructor({pointsApiService}){
    super();
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
      this._notify(UpdateType.FAILED);
    }

  }

  getDestinationById(id) {
    return this.#destination.find((item) => item.id === id);
  }

  getDestinationByName(name) {
    return this.#destination.find((item) => item.name === name);
  }

}
