import { TYPES } from '../mock/const.js';
import { DEFAULT_POINT } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDate, DATETIME_FORMAT_NEW } from '../utils/point.js';
import { getCapitalizeWord } from '../utils/common.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createTypeItemTemplate(currentType) {
  return TYPES.map((pointType) => `<div class="event__type-item">
            <input id="event-type-${pointType.toLowerCase()}-1"
              class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="${pointType.toLowerCase()}"
              ${pointType === currentType ? 'checked' : ''}>
            <label class="event__type-label
              event__type-label--${pointType.toLowerCase()}"
              for="event-type-${pointType.toLowerCase()}-1">${pointType}
            </label>
          </div>`).join('');
}

function createPointEditOfferTemplate(offers, hasOffer, pointOffers) {
  return (`${hasOffer ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offers.map((offer) => {
      const isCheckedOffer = pointOffers.includes(offer.id) ? 'checked' : '';
      return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden"
        id="event-offer-${offer.title.split(' ').slice(-1)}-1" type="checkbox"
        name="event-offer-${offer.title.split(' ').slice(-1).join('-')}" data-offer-id="${offer.id}" ${isCheckedOffer}>
      <label class="event__offer-label" for="event-offer-${offer.title.split(' ').slice(-1)}-1">
      <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
      </label>
      </div>`;
    }).join('')}
    </div>
    </section>` : ''}`
  );
}

function createPointEditDescriptionTeplate(hasDescription, {name, description, pictures}) {
  return (`${hasDescription ? `<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${name} - ${description}</p>

                ${pictures ? `<div class="event__photos-container">
                  <div class="event__photos-tape">
                  ${pictures.map(({src, description: alt}) => `<img class="event__photo"
                    src="${src}" alt="${alt}"></img>`).join('')}
                  </div>
                </div>` : ''}
              </section>` : ''}`
  );
}

function createPointEditTemplate(point, destinations, offers) {

  const {basePrice, dateFrom, dateTo, type, offers: offersId, destination: destinationId, hasOffer, hasDescription} = point;
  const sities = destinations.map((item) => item.name);
  // const overPrice () {}
  const typeOffers = offers.find((item) => item.type === type).offers;
  const pointDestination = destinations.find((item) => item.id === destinationId);

  const offerTemplate = createPointEditOfferTemplate(typeOffers, hasOffer, offersId); // offersId = point.offers?
  const destinationTemplate = createPointEditDescriptionTeplate(hasDescription, pointDestination);

  const dateTimeStart = humanizePointDate(dateFrom, DATETIME_FORMAT_NEW);
  const dateTimeEnd = humanizePointDate(dateTo, DATETIME_FORMAT_NEW);

  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${createTypeItemTemplate(type)}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${pointDestination.name}" list="destination-list-1">
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
              ${offerTemplate}
              ${destinationTemplate}
            </section>
          </form>
          </li>`
  );
}

export default class PointEditView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormSubmit = null;
  #onCLick = null;

  constructor({point = DEFAULT_POINT, destinations, offers, onFormSubmit, onClick}) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleFormSubmit = onFormSubmit;
    this.#onCLick = onClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#destinations, this.#offers);
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#clickHandler);
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group') // change type
      .addEventListener('change', this.#changeTypePointHandler);
    this.element.querySelector('input[list="destination-list-1"]') // input city/name destination
      .addEventListener('change', this.#changeNameDestinationHandler);
    this.element.querySelector('input[name="event-start-time"]')
      .addEventListener('change', this.#changeDateFromHandler);
    this.element.querySelector('input[name="event-end-time"]')
      .addEventListener('change', this.#changeDateToHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#changePriceHandler);
    this.element.querySelector('.event__section--offers')
      .addEventListener('change', this.#checkOffersHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#onCLick();
  };

  #changeTypePointHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: getCapitalizeWord(evt.target.value),
    });
  };

  #changeNameDestinationHandler = (evt) => {
    evt.preventDefault();
    const city = evt.target.value;
    const isPointDestination = this.#destinations.map((item) => item.name).includes(city);
    const pointDest = this.#destinations.find((item) => item.name === city);
    this.updateElement({
      destination: isPointDestination ? pointDest.id : 0,
    });
  };

  #changeDateFromHandler = () => {};
  #changeDateToHandler = () => {};

  #changePriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value,
    });
  };

  #checkOffersHandler = (evt) => {
    evt.preventDefault();
    const checkOffer = evt.target.dataset.offerId;
    let offersState = this._state.offers;

    if (offersState.includes(checkOffer)) {
      offersState = offersState.filter((item) => item !== checkOffer);
    } else {
      offersState.push(checkOffer);
    }
    this._setState({
      offers: offersState,
    });
  };

  static parsePointToState(point) {
    return {...point,
      hasOffer: point.type !== null,
      hasDescription: point.description !== null,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    if (!point.hasOffer) {
      point.offers = null;
    }

    if (!point.hasDescription) {
      point.description = null;
    }

    delete point.hasOffer;
    delete point.hasDescription;
  }
}
