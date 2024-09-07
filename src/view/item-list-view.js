import {createElement} from '../render.js';
import {timeDate, timeDiff} from '../util.js';


function createItemListTemplate(point, destination, offer) {

  const {name} = destination;
  const {base_price, date_from, date_to, is_favorite, type} = point;
  const favorite = is_favorite ? 'event__favorite-btn--active' : '';

  const dateFrom = timeDate(date_from,'hh:mm');
  const dateTo = timeDate(date_to,'hh:mm');
  const date = timeDate(date_from,'MMM D');
  const dateFull = timeDate(date_from,'YYYY-MM-DD');
  const duration = timeDiff(date_from,date_to);

  return (`<li class="trip-events__item">
          <div class="event">
            <time class="event__date" datetime="${dateFull}">${date}</time>
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${name}</h3>
            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${date_from}">${dateFrom}</time>
                —
                <time class="event__end-time" datetime="${date_to}">${dateTo}</time>
              </p>
              <p class="event__duration">${duration}M</p>
            </div>
            <p class="event__price">
              €&nbsp;<span class="event__price-value">${base_price}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${offer.map((item) => '<li class="event__offer"><span class="event__offer-title">' + item.title + '</span>+€&nbsp;<span class="event__offer-price">' + item.price + '</span></li>').join('')}
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

export default class ItemListView {

  constructor({point,offers,destinations}){
    this.point = point;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createItemListTemplate(this.point, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
