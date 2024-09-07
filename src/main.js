import FilterView from './view/filter-view.js';
import HeaderView from './view/header-view.js';
import {RenderPosition, render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from '../model/points-model.js';
import OffersModel from '../model/offers-model.js';
import DestinationsModel from '../model/destinations-model.js';

const siteHeaderTopElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const boardPresenter = new BoardPresenter({boardContainer: siteContentElement,pointsModel,offersModel,destinationsModel});

render(new FilterView(), siteHeaderElement);
render(new HeaderView(), siteHeaderTopElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();
