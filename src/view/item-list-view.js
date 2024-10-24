import AbstractView from '../framework/view/abstract-view.js';
import {timeDate, timeDiff} from '../utils/point.js';

const createOffersBlockTemplate = (offer) => `
    ${offer.map((item) => `<li class="event__offer"><span class="event__offer-title">${item.title}</span>+€&nbsp;<span class="event__offer-price">${item.price}</span></li>`).join('')}
`;


function createItemListTemplate(point, destination, offer) {
  const {name} = destination;
  const {basePrice, dateFrom, dateTo, isFavorite, type} = point;
  const favorite = isFavorite ? 'event__favorite-btn--active' : '';

  const dateFromItem = timeDate(dateFrom,'hh:mm');
  const dateToItem = timeDate(dateTo,'hh:mm');
  const date = timeDate(dateFrom,'MMM D');
  const dateFull = timeDate(dateFrom,'YYYY-MM-DD');
  const duration = timeDiff(dateFrom,dateTo);

  return (`<li class="trip-events__item">
          <div class="event">
            <time class="event__date" datetime="${dateFull}">${date}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${name}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${dateFromItem}">${dateFromItem}</time>
                —
                <time class="event__end-time" datetime="${dateToItem}">${dateToItem}</time>
              </p>
              <p class="event__duration">${duration}M</p>
            </div>
            <p class="event__price">
              €&nbsp;<span class="event__price-value">${basePrice}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${createOffersBlockTemplate(offer)}
            </ul>
            <button class="event__favorite-btn ${favorite}" type="button">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
              </svg>
            </button>
            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
      `);
}

export default class ItemListView extends AbstractView {
  #point = null;
  #offers = null;
  #destinations = null;
  #handleFavoriteClick = null;
  #handleEditClick = null;
  constructor({point, offers, destinations, onFavoriteClick, onEditClick}){
    super();
    this.#point = point;
    this.#offers = offers;
    this.#destinations = destinations.getDestinationById(point.destination);
    this.#handleFavoriteClick = onFavoriteClick;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('.event__favorite-btn ').addEventListener('click',this.#favoriteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click',this.#editClickHandler);
  }

  get template() {
    return createItemListTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    const favoriteButton = evt.target.closest('.event__favorite-btn');
    favoriteButton.toggleAttribute('disabled', true);
    this.#handleFavoriteClick();
  };

}
