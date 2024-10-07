import {render} from './framework/render.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import DestinationsModel from './model/destinations-model.js';
import NewPointButtonView from './view/new-point-button-veiw.js';

const newPointButtonComponent = new NewPointButtonView({
  onNewPointButtonClick: handleNewPointButtonClick,
});

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const filtersModel = new FiltersModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filtersModel,
  pointsModel
});
const destinationsModel = new DestinationsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: siteContentElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel,
  onNewPointDestroy: handleNewPointFormClose});

function handleNewPointFormClose() {
  newPointButtonComponent.element.toggleAttribute('disabled', false);
}

function handleNewPointButtonClick() {
  boardPresenter.createNewPoint();
  newPointButtonComponent.element.toggleAttribute('disabled', true);
}

render(newPointButtonComponent, tripMainElement);

boardPresenter.init();
filterPresenter.init();
