import NewHeaderTopBlockView from './view/header-top-block.js';
import NewFilterEvent from './view/filter-events.js';
import NewSortBlockView from './view/sort-block.js';

import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.page-body');
const siteHeaderTopElement = document.querySelector('.trip-main');
const siteHeaderElement = document.querySelector('.trip-controls__filters');
const siteContentElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter({boardContainer: siteContentElement});


render(new NewSortBlockView(), siteContentElement);
render(new NewFilterEvent(), siteHeaderElement);
render(new NewHeaderTopBlockView(), siteHeaderTopElement,'afterbegin');

boardPresenter.init();
