import AbstractView from '../framework/view/abstract-view.js';
import {FilterType} from '../const.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no future events now',
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
