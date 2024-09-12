import {destination} from '../mock/destination.js';

export default class DestinationsModel {

  destination = destination;

  getDestination(){
    return this.destination;
  }

  getDestinationById(id) {
    return destination.find((item) => item.id === id );
   }

}
