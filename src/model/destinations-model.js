import {destination} from '../mock/destination.js';

export default class DestinationsModel {

  #destination = destination;

  get destination(){
    return this.#destination;
  }

  getDestinationById(id) {
    return this.#destination.find((item) => item.id === id);
  }

  getDestinationByName(name) {
    return this.#destination.find((item) => item.name === name);
  }

}
