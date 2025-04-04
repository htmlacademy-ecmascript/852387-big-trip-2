import { TYPES } from '../mock/const.js';
import { DEFAULT_POINT } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate, DATETIME_FORMAT_NEW } from '../utils/point.js';

function createPointEditTemplate(point, destinations, offers) {

  const {basePrice, dateFrom, dateTo, type} = point;
  const typeOffers = offers.find((item) => item.type === point.type).offers;
  //const pointCheckedOffers = typeOffers.filter((typeOffer) => point.offers.includes(typeOffer.id));
  const pointDestination = destinations.find((item) => item.id === point.destination);
  const {name, description} = pointDestination || {};
  const pointId = point.id || 0;
  const sities = destinations.map((item) => item.name);
  //console.log(nameDestinationPoint);
  const dateTimeStart = humanizePointDate(dateFrom, DATETIME_FORMAT_NEW);
  const dateTimeEnd = humanizePointDate(dateTo, DATETIME_FORMAT_NEW);

  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${TYPES.map((pointType) =>
      `<div class="event__type-item">
                      <input id="event-type-${pointType.toLowerCase()}-${pointId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${pointType.toLowerCase()}" ${pointType === type ? 'checked' : ''}>
                      <label class="event__type-label  event__type-label--${pointType.toLowerCase()}" for="event-type-${pointType.toLowerCase()}-${pointId}">${pointType}</label>
                    </div>`).join('')}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${sities.map((sity) => `<option value="${sity}"></option>`).join('')}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateTimeStart}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTimeEnd}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
  ${typeOffers.map((offer) => {
      const checked = point.offers.includes(offer.id) ? 'checked' : '';
      return `<div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').slice(-1)}-${pointId}" type="checkbox" name="event-offer-${offer.title.split(' ').slice(-1)}" ${checked}>
              <label class="event__offer-label" for="event-offer-${offer.title.split(' ').slice(-1)}-${pointId}">
                <span class="event__offer-title">${offer.title}</span>
                &plus;&euro;&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </label>
            </div>`;
    }).join('')}

                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${name} - ${description}</p>
              </section>
            </section>
          </form>
          </li>`
  );
}

export default class PointEditView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #onCLick = null;

  constructor({point, destinations, offers, onFormSubmit, onClick}) {
    super();
    this.#point = point || DEFAULT_POINT;
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleFormSubmit = onFormSubmit;
    this.#onCLick = onClick;


    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  }

  get template() {
    return createPointEditTemplate(this.#point, this.#destinations, this.#offers);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#point);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#onCLick();
  };
}
