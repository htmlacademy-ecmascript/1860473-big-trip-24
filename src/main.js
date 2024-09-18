import {RenderPosition, render} from './framework/render.js';
import FilterView from './view/filter-view.js';
import HeaderView from './view/header-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import {generateFilter} from './mock/filter.js';

const siteHeaderTopElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.points);
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const boardPresenter = new BoardPresenter({boardContainer: siteContentElement,pointsModel,offersModel,destinationsModel});

render(new FilterView({filters}), siteHeaderElement);
render(new HeaderView(), siteHeaderTopElement, RenderPosition.AFTERBEGIN);

boardPresenter.init();