import {RenderPosition, render} from '../framework/render.js';
import ListView from '../view/list-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/point.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #destinationsModel = null;
  #boardPoint = [];
  #pointPresenters = new Map();

  #listViewComponent = new ListView();
  #ListEmptyViewComponent = new ListEmptyView();

  constructor({boardContainer,pointsModel,offersModel,filtersModel,destinationsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#filtersModel = filtersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#boardPoint = [...this.#pointsModel.points];

    render(this.#listViewComponent, this.#boardContainer);

    const siteHeaderElement = document.querySelector('.trip-controls__filters');
    const filters = this.#filtersModel.generateFilter(this.#pointsModel.points);
    render(new FilterView({filters}), siteHeaderElement);


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

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) =>{
    this.#boardPoint = updateItem(this.#boardPoint,updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint,
      [...this.#offersModel.getOfferById(updatedPoint.type,updatedPoint.offers)],
      this.#destinationsModel.getDestinationById(updatedPoint.destination),
      this.#offersModel.getOfferByType(updatedPoint.type)
    );
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  }

  #renderItem(point,offers,destinations, allOffers){

    const pointPresenter = new PointPresenter({
      listViewComponent : this.#listViewComponent.element,
      onDataChange : this.#handlePointChange,
      onModeChange : this.#handleModeChange,
    });

    pointPresenter.init(point, offers, destinations, allOffers);
    this.#pointPresenters.set(point.id,pointPresenter);
  }

}
