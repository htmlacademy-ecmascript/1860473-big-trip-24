//import { filter } from '../utils/filter.js';
import Observable from '../framework/observable.js';
import {filterType} from '../const.js';

export default class FiltersModel extends Observable {

  #filter = filterType.EVERYTHING;

  get filter(){
    return this.#filter;
  }

  setFilter(updateType, filter){
    this.#filter = filter;
    this._notify(updateType, filter);
  }

}
