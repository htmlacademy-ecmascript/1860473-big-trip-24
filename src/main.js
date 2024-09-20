import {RenderPosition, render} from './framework/render.js';
import HeaderView from './view/header-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import DestinationsModel from './model/destinations-model.js';

const siteHeaderTopElement = document.querySelector('.trip-main');
const siteContentElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const filtersModel = new FiltersModel();
const destinationsModel = new DestinationsModel();
const boardPresenter = new BoardPresenter({boardContainer: siteContentElement,pointsModel,offersModel,filtersModel,destinationsModel});

render(new HeaderView(), siteHeaderTopElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
