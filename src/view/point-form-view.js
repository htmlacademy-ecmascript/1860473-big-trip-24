import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {timeDate} from '../utils/point.js';
import {eventType,destinationList} from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createEventTypeBlockTemplate = () => `
    ${eventType.map((type) => `<div class="event__type-item">
                          <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
                          <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
                        </div>`).join('')}
`;

const createDestinationListBlockTemplate = () => `
    ${destinationList.map((type) => `<option value="${type}"></option>`).join('')}
`;

const createPicturesBlockTemplate = (pictures) => `
    ${pictures.map((item) => `<img class="event__photo" src="${item.src}" alt="${item.description}">`).join('')}
`;

function offersList(allOffersType,offerInPoint){
  const offerInPointId = offerInPoint ? offerInPoint.map((item) => (item.id)) : [];
  return allOffersType.map((item) =>`<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${item.id}-1" type="checkbox" name="event-offer-${item.id}" ${offerInPointId.includes(item.id) ? 'checked=""' : ''}>
                        <label class="event__offer-label" for="event-offer-${item.id}-1">
                          <span class="event__offer-title">${item.title}</span>
                          +€&nbsp;
                          <span class="event__offer-price">${item.price}</span>
                        </label>
                      </div>`).join('');
}

function createEditPointTemplate(point, offer) {

  const {basePrice, dateFrom, dateTo, type, typesOffers, typeDestinations} = point;

  const dateFromItem = timeDate(dateFrom,'DD/MM/YY hh:mm');
  const dateToItem = timeDate(dateTo,'DD/MM/YY hh:mm');

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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${typeDestinations.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDestinationListBlockTemplate()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromItem}">
                    —
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToItem}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                </header>
                <section class="event__details">
                ${offersList(typesOffers.offers,offer).length > 0 ? `
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offersList(typesOffers.offers,offer)}
                    </div>
                  </section>` : ''}

                  ${(typeDestinations.description || (typeDestinations.pictures.length > 0)) ? `
                    <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${typeDestinations.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPicturesBlockTemplate(typeDestinations.pictures)}
                      </div>
                    </div>
                  </section>` : ''}

                </section>
              </form></li>`);
}

export default class PointForm extends AbstractStatefulView {
  #allOffers = null;
  #offers = null;
  #point = null;
  #destinations = null;
  #handleFormSubmit = null;
  #handleCancelClick = null;
  #allOffersTypes = null;
  #destinationsTypes = null;
  #datePickerStart = null;
  #datePickerEnd = null;

  constructor({point, allOffers, offers, destinations, onFormSubmit, onCancelClick}){
    super();
    this.#allOffersTypes = allOffers;
    this.#point = point;
    this.#allOffers = this.#allOffersTypes.getOfferByType(point.type);
    this.#destinationsTypes = destinations;
    this.#destinations = this.#destinationsTypes.getDestinationById(point.destination);
    this._setState(PointForm.parsePointToState(point, this.#allOffers, this.#destinations));

    this.#offers = offers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCancelClick = onCancelClick;

    this._restoreHandlers();
  }

  get template() {
    return createEditPointTemplate(this._state, this.#offers);
  }

  removeElement() {
    super.removeElement();

    if (this.#datePickerStart) {
      this.#datePickerStart.destroy();
      this.#datePickerStart = null;
    }

    if (this.#datePickerEnd) {
      this.#datePickerEnd.destroy();
      this.#datePickerEnd = null;
    }
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit',this.#formSubmitHandler);
    this.element.querySelector('#event-destination-1').addEventListener('change',this.#destinationChangeHandler);
    this.element.querySelector('.event__type-list').addEventListener('click',this.#offerChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click',this.#cancelClickHandler);

    this.#setDatePickerStart();
    this.#setDatePickerEnd();
  }

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCancelClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointForm.parseStateToPoint(this._state, this.#allOffers, this.#destinations));
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destination = evt.target.value;
    this.updateElement({
      typeDestinations : {...this.#destinationsTypes.getDestinationByName(destination)},
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const offer = evt.target.previousElementSibling.value;
    this.updateElement({
      type: offer,
      typesOffers : {...this.#allOffersTypes.getOfferByType(offer)},
    });
  };

  #setDatePickerStart(){
    this.#datePickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat:'d/m/y H:i',
        enableTime : true,
        'time_24hr' : true,
        defaultDate: this._state.dateFrom,
        maxDate : this._state.dateTo,
        onChange: this.#dateStartChangeHandler,
      }
    );
  }

  #setDatePickerEnd(){
    this.#datePickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat:'d/m/y H:i',
        defaultDate: this._state.dateTo,
        enableTime : true,
        'time_24hr' : true,
        minDate : this._state.dateFrom,
        onChange: this.#dateEndChangeHandler,
      }
    );
  }

  #dateStartChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateEndChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  static parsePointToState(point,typesOffers,typeDestinations) {
    return {...point,typesOffers,typeDestinations};
  }

  static parseStateToPoint(state,typesOffers,typeDestinations) {
    return {...state,typesOffers,typeDestinations};
  }

}
