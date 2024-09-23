import { filter } from '../utils/filter.js';

export default class FiltersModel {

  #filter = filter;

  get filters(){
    return this.#filter;
  }

  generateFilter(points){
    return Object.entries(filter).map(
      ([filterType,filterPoint]) => ({
        type: filterType,
        count: filterPoint(points).length,
      }),
    );
  }

}
