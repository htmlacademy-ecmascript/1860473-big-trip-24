import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortBlockItemTemplate = (key, type, currentSortType) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${type === currentSortType ? 'checked' : ''} ${type === 'event' || type === 'offers' ? 'disabled' : ''}>
    <label data-sort-type="${type}" class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>
`;

const createSortBlockTemplate = (currentSortType) => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.entries(SortType).map(([key, type]) => createSortBlockItemTemplate(key,type, currentSortType)).join('')}
  </form>
`;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #currentSortType = SortType.DAY;

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
    if (evt.target.dataset.sortType !== 'event' && evt.target.dataset.sortType !== 'offers'){
      this.#handleSortTypeChange(evt.target.dataset.sortType);
    }
  };

}
