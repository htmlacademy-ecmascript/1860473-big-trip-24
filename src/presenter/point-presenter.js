import {replace, render} from '../framework/render.js';
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

  constructor({listViewComponent}) {
    this.#listViewComponent = listViewComponent;
  }

  init(point, offers, destinations, allOffers){
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#allOffers = allOffers;

    this.#itemComponent = new ItemListView({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      onEditClick: () => {
        this.#replaceCardToForm();
      }});


    this.#pointFormComponent = new PointForm({
      point: this.#point,
      offers: this.#offers,
      destinations: this.#destinations,
      allOffers: this.#allOffers,
      onFormSubmit: () => {
        this.#replaceFormToCard();
      }
    });

    render(this.#itemComponent, this.#listViewComponent);
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

}
