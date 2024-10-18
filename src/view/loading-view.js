import AbstractView from '../framework/view/abstract-view.js';

const LoadType = {
  LOADING: 'Loading...',
  FAILED: 'Failed to load latest route information',
};

function createLoadingViewTemplate(loadType) {
  const noPointsTextValue = LoadType[loadType];
  return `<p class="trip-events__msg">${noPointsTextValue}</p>`;
}

export default class LoadingView extends AbstractView {
  #loadType = null;

  constructor({loadType}) {
    super();
    this.#loadType = loadType;
  }

  get template() {
    return createLoadingViewTemplate(this.#loadType);
  }

}
