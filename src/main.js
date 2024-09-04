import FilterView from './view/filter-view.js';
import HeaderView from './view/header-view.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderTopElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: siteContentElement});

render(new FilterView(), siteHeaderElement);
render(new HeaderView(), siteHeaderTopElement,'afterbegin');

boardPresenter.init();
