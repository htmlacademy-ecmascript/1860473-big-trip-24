import { UpdateType, UserAction, NewPOINT } from '../const';
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
      point: NewPOINT,
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

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
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
