import { createElement } from '../render';

function createItemsListTemplate() {
  return (`<ul class="trip-events__list"></ul>`);
}

export default class ListView {
  getTemplate() {
    return createItemsListTemplate();
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
