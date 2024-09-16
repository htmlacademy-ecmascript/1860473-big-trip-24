import {RenderPosition, replace, render} from '../framework/render.js';
import ItemListView from '../view/item-list-view.js';
import SortView from '../view/sort-view.js';
import PointForm from '../view/point-form.js';
import ListView from '../view/list-view.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #boardPoint = [];

  #listViewComponent = new ListView();

  constructor({boardContainer,pointsModel,offersModel,destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#boardPoint = [...this.#pointsModel.points];

    render(this.#listViewComponent, this.#boardContainer);
    render(new SortView(), this.#boardContainer, RenderPosition.AFTERBEGIN);

    for (let i = 1; i < this.#boardPoint.length; i++) {
      this.#renderItem(this.#boardPoint[i],
        [...this.#offersModel.getOfferById(this.#boardPoint[i].type,this.#boardPoint[i].offers)],
        this.#destinationsModel.getDestinationById(this.#boardPoint[i].destination),
        this.#offersModel.getOfferByType(this.#boardPoint[i].type),);
    }
  }

  #renderItem(point,offers,destinations, allOffers){

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const itemComponent = new ItemListView({point, offers,destinations, allOffers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }});


    const pointFormComponent = new PointForm({
      point, offers, destinations, allOffers,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm(){
      replace(pointFormComponent,itemComponent);
    }

    function replaceFormToCard(){
      replace(itemComponent, pointFormComponent);
    }

    render(itemComponent, this.#listViewComponent.element);
  }
}
