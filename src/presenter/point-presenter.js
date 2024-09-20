import {replace, render, remove} from '../framework/render.js';
import PointForm from '../view/point-form.js';
import ItemListView from '../view/item-list-view.js';


export default class PointPresenter{
  #listViewComponent = null;
  #itemComponent = null;
  #pointFormComponent = null;
  #point = null;
  #offers = null;
  #destinations = null;
  #allOffers = null;
  #handleDataChange = null;

  constructor({listViewComponent,onDataChange}) {
    this.#listViewComponent = listViewComponent;
    this.#handleDataChange = onDataChange;
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
      onFavoriteClick : this.#handleFavoriteClick,
      onFormSubmit: this.#handleFormSubmit
    });

    if (!prevPointComponent || !prevPointFormComponent){
      render(this.#itemComponent, this.#listViewComponent);
      return;
    }

    if (this.#listViewComponent.contains(prevPointComponent.element)){
      replace(this.#itemComponent,prevPointComponent);
    }

    if (this.#listViewComponent.contains(prevPointFormComponent.element)){
      replace(this.#pointFormComponent,prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);

  }

  destroy(){
    remove(this.#itemComponent);
    remove(this.#pointFormComponent);
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
  }

  #replaceFormToCard(){
    replace(this.#itemComponent, this.#pointFormComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite : !this.#point.isFavorite});
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(point);
    this.#replaceFormToCard();
  };

}
