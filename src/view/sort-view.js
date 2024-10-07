import AbstractView from '../framework/view/abstract-view.js';
import { sortType } from '../const.js';

const createSortBlockItemTemplate = (key, type, currentSortType) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${type === currentSortType ? 'checked' : ''}>
    <label data-sort-type="${type}" class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>
`;

const createSortBlockTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.entries(sortType).map(([key, type]) => createSortBlockItemTemplate(key,type, currentSortType)).join('')}
  </form>
`;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}){
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click',this.#sortTypeChange);
  }

  get template() {
    return createSortBlockTemplate(this.#currentSortType);
  }

  #sortTypeChange = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
