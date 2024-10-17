import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import FiltersModel from './model/filters-model.js';
import DestinationsModel from './model/destinations-model.js';
import NewPointButtonView from './view/new-point-button-veiw.js';
import PointsApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic fger8ki98pfl2';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const newPointButtonComponent = new NewPointButtonView({
  onNewPointButtonClick: handleNewPointButtonClick,
});

const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filtersModel = new FiltersModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement,
  filtersModel,
  pointsModel
});
const destinationsModel = new DestinationsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const boardPresenter = new BoardPresenter({
  boardContainer: siteContentElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel,
  newPointButtonComponent,
  onNewPointDestroy: handleNewPointFormClose});

function handleNewPointFormClose() {
  newPointButtonComponent.element.toggleAttribute('disabled', false);
}

function handleNewPointButtonClick() {
  boardPresenter.createNewPoint();
  newPointButtonComponent.element.toggleAttribute('disabled', true);
}

filterPresenter.init();
boardPresenter.init();

