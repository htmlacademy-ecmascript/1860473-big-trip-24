import {replace, render, remove} from '../framework/render.js';
import PointForm from '../view/point-form-view.js';
import ItemListView from '../view/item-list-view.js';

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
      onFormSubmit: this.#handleFormSubmit,
      onCancelClick: this.#handleCancelClick
    });

    if (!prevPointComponent || !prevPointFormComponent){
      render(this.#itemComponent, this.#listViewComponent);
      return;
    }

    if (this.#Mode === Mode.DEFAULT){
      replace(this.#itemComponent,prevPointComponent);
    }

    if (this.#Mode === Mode.EDITING){
      replace(this.#pointFormComponent,prevPointFormComponent);
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

  #handleEditClick = () => {
    this.#replaceCardToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite : !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToCard();
  };

}
