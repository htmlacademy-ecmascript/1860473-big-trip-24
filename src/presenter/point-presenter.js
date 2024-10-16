import {replace, render, remove} from '../framework/render.js';
import PointForm from '../view/point-form-view.js';
import ItemListView from '../view/item-list-view.js';
import { UserAction, UpdateType } from '../const.js';
import {isDatesEqual} from '../utils/point.js';

const Mode = {
  DEFAULT : 'DEFAULT',
  EDITING : 'EDITING',
};

export default class PointPresenter{
  #listViewComponent = null;
  #itemComponent = null;
  #pointFormComponent = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #allOffers = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #Mode = Mode.DEFAULT;

  constructor({listViewComponent, onDataChange, onModeChange}) {
    this.#listViewComponent = listViewComponent;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, offers, destinations, allOffers){
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#allOffers = allOffers;


    const prevPointComponent = this.#itemComponent;
    const prevPointFormComponent = this.#pointFormComponent;

    this.#itemComponent = new ItemListView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onFavoriteClick : this.#handleFavoriteClick,
      onEditClick: this.#handleEditClick
    });


    this.#pointFormComponent = new PointForm({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      allOffers: this.#allOffers,
      isNewPoint: false,
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick,
      onDeleteClick: this.#handleDeleteClick
    });


    if (!prevPointComponent || !prevPointFormComponent){
      render(this.#itemComponent, this.#listViewComponent);
      return;
    }

    if (this.#Mode === Mode.DEFAULT){
      replace(this.#itemComponent,prevPointComponent);
    }

    if (this.#Mode === Mode.EDITING){
      //replace(this.#pointFormComponent,prevPointFormComponent);
      replace(this.#itemComponent, prevPointFormComponent);
      this.#Mode = Mode.DEFAULT;
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);

  }

  destroy(){
    remove(this.#itemComponent);
    remove(this.#pointFormComponent);
  }

  resetView(){
    if (this.#Mode !== Mode.DEFAULT){
      this.#replaceFormToCard();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  setSaving() {
    if (this.#Mode === Mode.EDITING) {
      this.#pointFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#Mode === Mode.EDITING) {
      this.#pointFormComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#Mode === Mode.DEFAULT) {
      this.#itemComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointFormComponent.shake(resetFormState);
  }

  #replaceCardToForm(){
    replace(this.#pointFormComponent,this.#itemComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#Mode = Mode.EDITING;
  }

  #replaceFormToCard(){
    replace(this.#itemComponent, this.#pointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#Mode = Mode.DEFAULT;
  }

  #handleCancelClick = () => {
    this.#replaceFormToCard();
    this.#Mode = Mode.DEFAULT;
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };


  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {...this.#point, isFavorite : !this.#point.isFavorite});
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) || !isDatesEqual(this.#point.basePrice, update.basePrice) || !isDatesEqual(this.#point.dateTo, update.dateTo);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update);
    //this.#replaceFormToCard();
  };

}
