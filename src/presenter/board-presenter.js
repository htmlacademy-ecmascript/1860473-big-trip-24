import {RenderPosition, render, remove} from '../framework/render.js';
import ListView from '../view/list-view.js';
import HeaderView from '../view/header-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { sortPointDate, sortPointTime, sortPointPrice, sortPointEvent} from '../utils/point.js';
import { sortType, userAction, updateType, filterType, DEFAULT_FILTER_TYPE } from '../const.js';
import {filter} from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #destinationsModel = null;
  #noPointComponent = null;

  #pointPresenters = new Map();
  #sortComponent = null;
  #currentSortType = null;
  #filterTypes = filterType.EVERYTHING;

  #newPointPresenter = null;

  #listViewComponent = new ListView();

  constructor({boardContainer,pointsModel,offersModel,destinationsModel,filtersModel, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filtersModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#listViewComponent.element,
      destinations: this.#destinationsModel,
      offers: this.#offersModel,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy,
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points(){
    this.#filterTypes = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterTypes](points);

    switch (this.#currentSortType) {
      case sortType.DAY:
        return filteredPoints.sort(sortPointDate);
      case sortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case sortType.TIME:
        return filteredPoints.sort(sortPointTime);
      case sortType.EVENT:
        return filteredPoints.sort(sortPointEvent);

    }

    return filteredPoints;
  }

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

    switch (actionType) {
      case userAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case userAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case userAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateTypes, data) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)

    switch (updateTypes) {
      case updateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        const offers = [...this.#offersModel.getOfferById(data.type,data.offers)];
        this.#pointPresenters.get(data.id).init(data,
          offers,
          this.#destinationsModel,
          this.#offersModel);
        break;
      case updateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case updateType.MAJOR:
        console.log(data.id);
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  init() {

    const siteHeaderTopElement = document.querySelector('.trip-main');

    render(new HeaderView(), siteHeaderTopElement, RenderPosition.AFTERBEGIN);

    this.#renderBoard();

  }


  createNewPoint() {
    this.#currentSortType = sortType.DAY;
    this.#filtersModel.setFilter(updateType.MAJOR, DEFAULT_FILTER_TYPE);
    this.#newPointPresenter.init();
  }


  #clearBoard({resetSortType = false} = {}) {
    const pointCount = this.points.length;

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);

    if (resetSortType) {
      this.#currentSortType = sortType.DEFAULT;
    }
  }

  #handlePointChange = (updatedPoint) =>{


    const offers = [...this.#offersModel.getOfferById(updatedPoint.type,updatedPoint.offers)];

    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint,
      offers,
      this.#destinationsModel,
      this.#offersModel
    );
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderItem(point,offers,destinations, allOffers){

    const pointPresenter = new PointPresenter({
      listViewComponent : this.#listViewComponent.element,
      onDataChange : this.#handleViewAction,
      onModeChange : this.#handleModeChange,
    });

    pointPresenter.init(point, offers, destinations, allOffers);
    this.#pointPresenters.set(point.id,pointPresenter);
  }


  #handleSortTypeChange = (sortTypes) => {
    if (this.#currentSortType === sortTypes){
      return;
    }

    this.#currentSortType = sortTypes;
    this.#clearBoard();
    this.#renderBoard();

  };

  #renderSort(){
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange : this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints(){
    this.#noPointComponent = new ListEmptyView({
      filterTypes: this.#filterTypes
    });

    render(this.#noPointComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }


  #renderBoard() {
    render(this.#listViewComponent, this.#boardContainer);
    if (this.points.length === 0){
      this.#renderNoPoints();
      return;
    }
    this.#renderSort();
    for (let i = 0; i < this.points.length; i++) {
      const offers = [...this.#offersModel.getOfferById(this.points[i].type,this.points[i].offers)];

      this.#renderItem(this.points[i],
        offers,
        this.#destinationsModel,
        this.#offersModel,);
    }

  }

}
