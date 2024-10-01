import {RenderPosition, render} from '../framework/render.js';
import ListView from '../view/list-view.js';
import HeaderView from '../view/header-view.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem, sortPointDate, sortPointTime, sortPointPrice, sortPointEvent} from '../utils/point.js';
import { sortType } from '../const.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #destinationsModel = null;
  #boardPoint = [];
  #pointPresenters = new Map();
  #sortComponent = null;
  #currentSortType = null;
  #sourcedBoardPoints = [];

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
    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    const siteHeaderElement = document.querySelector('.trip-controls__filters');
    const siteHeaderTopElement = document.querySelector('.trip-main');
    const filters = this.#filtersModel.generateFilter(this.#pointsModel.points);
    render(new FilterView({filters}), siteHeaderElement);
    render(new HeaderView(), siteHeaderTopElement, RenderPosition.AFTERBEGIN);

    this.#renderBoard();

  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #handlePointChange = (updatedPoint) =>{
    this.#boardPoint = updateItem(this.#boardPoint,updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#boardPoint,updatedPoint);

    const offers = [...this.#offersModel.getOfferById(updatedPoint.type,updatedPoint.offers)];
    //const destinations = this.#destinationsModel.getDestinationById(updatedPoint.destination);
    const destinations = this.#destinationsModel;
    //const allOffers = this.#offersModel.getOfferByType(updatedPoint.type);
    const allOffers = this.#offersModel;

    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint,
      offers,
      destinations,
      allOffers
    );
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderItem(point,offers,destinations, allOffers){

    const pointPresenter = new PointPresenter({
      listViewComponent : this.#listViewComponent.element,
      onDataChange : this.#handlePointChange,
      onModeChange : this.#handleModeChange,
    });

    pointPresenter.init(point, offers, destinations, allOffers);
    this.#pointPresenters.set(point.id,pointPresenter);
  }

  #sortPoints(sortTypes){

    switch(sortTypes){
      case sortType.DAY:
        this.#boardPoint.sort(sortPointDate);
        break;
      case sortType.PRICE:
        this.#boardPoint.sort(sortPointPrice);
        break;
      case sortType.TIME:
        this.#boardPoint.sort(sortPointTime);
        break;
      case sortType.EVENT:
        this.#boardPoint.sort(sortPointEvent);
        break;
      default:
        this.#boardPoint = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortTypes;

  }

  #handleSortTypeChange = (sortTypes) => {
    if (this.#currentSortType === sortTypes){
      return;
    }

    this.#sortPoints(sortTypes);
    this.#clearPointList();
    this.#renderPointList();

  };

  #renderSort(){
    this.#sortComponent = new SortView({
      onSortTypeChange : this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoTasks(){
    render(this.#ListEmptyViewComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPointList() {
    for (let i = 0; i < this.#boardPoint.length; i++) {
      const offers = [...this.#offersModel.getOfferById(this.#boardPoint[i].type,this.#boardPoint[i].offers)];
      //const destinations = this.#destinationsModel.getDestinationById(this.#boardPoint[i].destination);
      const destinations = this.#destinationsModel;
      //const allOffers = this.#offersModel.getOfferByType(this.#boardPoint[i].type);
      const allOffers = this.#offersModel;
      this.#renderItem(this.#boardPoint[i],
        offers,
        destinations,
        allOffers,);
    }
  }

  #renderBoard() {
    render(this.#listViewComponent, this.#boardContainer);
    if (this.#boardPoint.length === 0){
      this.#renderNoTasks();
      return;
    }
    this.#renderSort();
    this.#renderPointList();

  }

}
