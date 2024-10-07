import AbstractView from '../framework/view/abstract-view.js';
import {filterType} from '../const.js';

const NoPointsTextType = {
  [filterType.EVERYTHING]: 'Click New Event to create your first point',
  [filterType.FUTURE]: 'There are no past events now',
  [filterType.PRESENT]: 'There are no present events now',
  [filterType.PAST]: 'There are no future events now',
};

function createListEmptyTemplate(filterTypes) {
  const noPointsTextValue = NoPointsTextType[filterTypes];
  return `<p class="trip-events__msg">${noPointsTextValue}</p>`;
}

export default class ListEmptyView extends AbstractView {
  #filterTypes = null;

  constructor({filterTypes}) {
    super();
    this.#filterTypes = filterTypes;
  }

  get template() {
    return createListEmptyTemplate(this.#filterTypes);
  }

}
