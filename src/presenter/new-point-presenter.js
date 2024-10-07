import { nanoid } from 'nanoid';
import { updateType, userAction, newPOINT } from '../const';
import { remove, render, RenderPosition } from '../framework/render';
import PointForm from '../view/point-form-view.js';

export default class NewPointPresenter {
  #pointListContainer = null;

  #destinations = [];
  #offers = [];

  #handleDataChange = null;
  #handleDestroy = null;

  #pointEditComponent = null;

  constructor({
    pointListContainer,
    destinations,
    offers,
    onDataChange,
    onDestroy,
  }) {
    this.#pointListContainer = pointListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new PointForm({
      point: newPOINT,
      offers: '',
      destinations: this.#destinations,
      allOffers: this.#offers,
      isNewPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick

    });

    render(
      this.#pointEditComponent,
      this.#pointListContainer,
      RenderPosition.AFTERBEGIN
    );

    document.addEventListener('keydown', this.#escapeKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escapeKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      userAction.ADD_POINT,
      updateType.MINOR,
       { ...point, id: nanoid() },
    );
    this.destroy();
  };

  #handleCancelClick = () => {
    this.destroy();
  };

  #escapeKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
