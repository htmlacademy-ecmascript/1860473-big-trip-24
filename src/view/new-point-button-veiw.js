import AbstractView from '../framework/view/abstract-view.js';
function createNewPointButtonTemplate() {
  return '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';
}

export default class NewPointButtonView extends AbstractView {
  #handleNewPointClick = null;

  constructor({onNewPointButtonClick}) {
    super();
    this.#handleNewPointClick = onNewPointButtonClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewPointClick();
  };
}
