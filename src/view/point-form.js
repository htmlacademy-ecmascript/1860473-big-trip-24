import {createElement} from '../render.js';
import {timeDate} from '../util.js';
import {eventType,destinationList} from '../const.js';

const createEventTypeBlockTemplate = () => `
    ${eventType.map((type) => `<div class="event__type-item">
                          <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
                        </div>`).join('')}
`;

const createDestinationListBlockTemplate = () => `
    ${destinationList.map((type) => `<option value="${type}"></option>`).join('')}
`;

function offersList(allOffersType,offerInPoint){

  const offerInPointId = offerInPoint ? offerInPoint.map((item) => (item.id)) : [];
  return allOffersType.map((item) => `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${offerInPointId.includes(item.id) ? 'checked=""' : ''}>
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">${item.title}</span>
                          +€&nbsp;
                          <span class="event__offer-price">${item.price}</span>
                        </label>
                      </div>`).join('');
}

function createEditPointTemplate(point, destination, offer, allOffers) {

  const {offers} = allOffers;
  const {name,description,pictures} = destination;
  const {base_price, date_from, date_to, type} = point;

  const dateFrom = timeDate(date_from,'DD/MM/YY hh:mm');
  const dateTo = timeDate(date_to,'DD/MM/YY hh:mm');

  return (
    `<li class="trip-events__item"><form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${createEventTypeBlockTemplate()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDestinationListBlockTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${base_price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offersList(offers,offer)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${pictures.map((item) => '<img class="event__photo" src="' + item.src + '" alt="' + item.description + '">').join('')}
                      </div>
                    </div>
                  </section>
                </section>
              </form></li>`);
}

export default class PointForm {

  constructor({point,allOffers,offers,destinations}){
    this.point = point;
    this.allOffers = allOffers;
    this.offers = offers;
    this.destinations = destinations;
  }

  getTemplate() {
    return createEditPointTemplate(this.point, this.destinations, this.offers, this.allOffers);
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