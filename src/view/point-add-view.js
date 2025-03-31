import AbstractView from '../framework/view/abstract-view.js';
import { TYPES } from '../mock/const.js';
import { DEFAULT_POINT } from '../const.js';

function createPointAddTemplate(point, destinations, offers) {
  const { basePrice, type } = point;
  const typeOffers = offers.find((item) => item.type === point.type).offers;
  const pointDestination = destinations.find((item) => item.id === point.destination);
  const {name, description, pictures} = pointDestination || {};
  const pointId = point.id || 0;
  const sities = destinations.map((item) => item.name);

  return `<form class="event event--edit" action="#" method="post">
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
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
            </header>
            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                ${typeOffers.map((offer) =>
    // eslint-disable-next-line indent
                 `<div class="event__offer-selector">
                    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').slice(-1)}-${pointId}" type="checkbox" name="event-offer-${offer.title.split(' ').slice(-1)}">
                    <label class="event__offer-label" for="event-offer-${offer.title.split(' ').slice(-1)}-${pointId}">
                      <span class="event__offer-title">${offer.title}</span>
                      &plus;&euro;&nbsp;
                      <span class="event__offer-price">${offer.price}</span>
                    </label>
                  </div>`).join('')}

                </div>
              </section>
              ${pointDestination ? (
    `<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>
                ${pictures.length ? (
      `<div class="event__photos-container">
                  <div class="event__photos-tape">
                  ${pictures.map((pic) => `<img class="event__photo" src="${pic.src}" alt="${pic.description}"></img>`).join('')}
                  </div>
                </div>`) : ''}
              </section>`) : ''}
            </section>
          </form>`;
}

export default class PointAddView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;

  constructor({ point, destinations, offers }) {
    super();
    this.#point = point || DEFAULT_POINT;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createPointAddTemplate(this.#point, this.#destinations, this.#offers);
  }
}
