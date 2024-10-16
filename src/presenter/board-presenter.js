import {RenderPosition, render, remove} from '../framework/render.js';
import ListView from '../view/list-view.js';
import HeaderView from '../view/header-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { sortPointDate, sortPointTime, sortPointPrice } from '../utils/point.js';
import { SortType, UserAction, UpdateType, FilterType, DEFAULT_FILTER_TYPE } from '../const.js';
import {filter} from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #destinationsModel = null;
  #noPointComponent = null;
  #pointPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DAY;
  #filterTypes = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #listViewComponent = new ListView();
  #loadingComponent = new LoadingView();
  #isLoading = true;

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
      case SortType.DAY:
        return filteredPoints.sort(sortPointDate);
      case SortType.PRICE:
        return filteredPoints.sort(sortPointPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortPointTime);

    }

    return filteredPoints;
  }

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
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
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data,
          [...this.#offersModel.getOfferById(data.type,data.offers)],
          this.#destinationsModel,
          this.#offersModel);
        break;
      case UpdateType.MINOR:
        this.#currentSortType = SortType.DAY;
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard({resetSortType: true});
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, DEFAULT_FILTER_TYPE);
    this.#newPointPresenter.init();
  }


  #clearBoard({resetSortType = false} = {}) {

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderLoading(){
    render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
  }

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

    if (this.#isLoading){
      this.#renderLoading();
      return;
    }

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
