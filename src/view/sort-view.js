import {createElement} from '../render.js';

const SORT_TYPES = ['day','event','time','price','offer'];

const createSortBlockTemplate = () => `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${SORT_TYPES.map( type => createSortBlockItemTemplate(type)).join('')}
  </form>
`;

const createSortBlockItemTemplate = (e) => `
  <div class="trip-sort__item  trip-sort__item--${e}">
    <input id="sort-${e}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${e}">
    <label class="trip-sort__btn" for="sort-${e}">${e}</label>
  </div>
`;

export default class SortView {
  getTemplate() {
    return createSortBlockTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
