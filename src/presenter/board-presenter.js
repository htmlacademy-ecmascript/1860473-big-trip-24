import {RenderPosition, replace, render} from '../framework/render.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #boardPoint = [];

  #listViewComponent = new ListView();
  #ListEmptyViewComponent = new ListEmptyView();

  constructor({boardContainer,pointsModel,offersModel,destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#boardPoint = [...this.#pointsModel.points];

    render(this.#listViewComponent, this.#boardContainer);


    if (this.#boardPoint.length === 0){
      render(this.#ListEmptyViewComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
      return;
    } else {
      render(new SortView(), this.#boardContainer, RenderPosition.AFTERBEGIN);
    }

    for (let i = 0; i < this.#boardPoint.length; i++) {
      this.#renderItem(this.#boardPoint[i],
        [...this.#offersModel.getOfferById(this.#boardPoint[i].type,this.#boardPoint[i].offers)],
        this.#destinationsModel.getDestinationById(this.#boardPoint[i].destination),
        this.#offersModel.getOfferByType(this.#boardPoint[i].type),);
    }
  }

  #renderItem(point,offers,destinations, allOffers){

    const pointPresenter = new PointPresenter({
      listViewComponent : this.#listViewComponent.element,
    });

    pointPresenter.init(point, offers, destinations, allOffers);
  }

}
