import AbstractView from '../framework/view/abstract-view.js';
import { sortType } from '../const.js';

const createSortBlockItemTemplate = (key, type) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}">
    <label data-sort-type="${type}" class="trip-sort__btn" for="sort-${type}">${type}</label>
  </div>
`;

const createSortBlockTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${Object.entries(sortType).map(([key, type]) => createSortBlockItemTemplate(key,type)).join('')}
  </form>
`;

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}){
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click',this.#sortTypeChange);
  }

  get template() {
    return createSortBlockTemplate();
  }

  #sortTypeChange = (evt) => {
    evt.preventDefault();
    evt.target.previousElementSibling.checked = true;
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
