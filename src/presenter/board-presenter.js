import {RenderPosition, render, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import ListView from '../view/list-view.js';
import HeaderView from '../view/header-view.js';
import SortView from '../view/sort-view.js';
import ListEmptyView from '../view/list-empty-view.js';
import PointPresenter from './point-presenter.js';
import { sortPointDate, sortPointTime, sortPointPrice } from '../utils/point.js';
import { SortType, UserAction, UpdateType, FilterType, DEFAULT_FILTER_TYPE, LoadType } from '../const.js';
import {filter} from '../utils/filter.js';
import NewPointPresenter from './new-point-presenter.js';
import LoadingView from '../view/loading-view.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};


export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #filtersModel = null;
  #destinationsModel = null;
  #noPointComponent = null;
  #pointPresenter = new Map();
  #sortComponent = null;
  #newPointButtonComponent = null;
  #currentSortType = SortType.DAY;
  #filterTypes = FilterType.EVERYTHING;
  #newPointPresenter = null;
  #listViewComponent = new ListView();

  #loadingComponent = new LoadingView({
    loadType: LoadType.LOADING
  });
  #failedComponent = new LoadingView({
    loadType: LoadType.FAILED
  });
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({boardContainer,pointsModel,offersModel,destinationsModel,filtersModel, newPointButtonComponent, onNewPointDestroy}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filtersModel = filtersModel;
    this.#newPointButtonComponent = newPointButtonComponent;

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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenter.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenter.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenter.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateTypes, data) => {
    switch (updateTypes) {
      case UpdateType.PATCH:
        this.#pointPresenter.get(data.id).init(data,
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
      case UpdateType.FAILED:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderLoading(LoadType.FAILED);
        break;
    }
  };

  async init() {

    const siteHeaderTopElement = document.querySelector('.trip-main');

    render(new HeaderView(), siteHeaderTopElement, RenderPosition.AFTERBEGIN);
    render(this.#newPointButtonComponent, siteHeaderTopElement, RenderPosition.BEFOREEND);

    this.#renderBoard();

    await this.#destinationsModel.init();
    await this.#offersModel.init();
    await this.#pointsModel.init();

  }


  createNewPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filtersModel.setFilter(UpdateType.MAJOR, DEFAULT_FILTER_TYPE);
    this.#newPointPresenter.init();
  }

  #clearBoard({resetSortType = false} = {}) {

    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);
    remove(this.#loadingComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderLoading(status){
    switch (status) {
      case LoadType.LOADING:
        render(this.#loadingComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
        break;
      case LoadType.FAILED:
        render(this.#failedComponent, this.#boardContainer, RenderPosition.AFTERBEGIN);
        break;
    }
  }

  #renderItem(point,offers,destinations, allOffers){

    const pointPresenter = new PointPresenter({

      listViewComponent : this.#listViewComponent.element,
      onDataChange : this.#handleViewAction,
      onModeChange : this.#handleModeChange,
    });

    pointPresenter.init(point, offers, destinations, allOffers);
    this.#pointPresenter.set(point.id,pointPresenter);
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
      this.#renderLoading(LoadType.LOADING);
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
