/* eslint-disable no-prototype-builtins */
import he from 'he';
import { DEFAULT_POINT, TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { humanizePointDate, DATETIME_FORMAT_NEW } from '../utils/point.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createBtnsTemplate(isDisabled, isSaving, isDeleting, isPointId) {
  let signature = '';
  if (!isPointId) {
    signature = 'Cancel';
  } else if (isDeleting) {
    signature = 'Deleting...';
  } else {
    signature = 'Delete';
  }

  return (`
        <button class="event__save-btn  btn  btn--blue" type="submit"
          ${ isDisabled ? 'disabled' : ''}>
          ${isSaving ? 'saving...' : 'Save'}
        </button>
        <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
          ${signature}





        </button>
          ${isPointId ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Close event</span>
        </button>` : ''}
`);
}


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

function createPointEditOfferTemplate(offers, pointOffers) {
  return (`${offers ? `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
    ${offers.map((offer) => {
      const isCheckedOffer = (pointOffers.length !== 0 && pointOffers.includes(offer.id)) ? 'checked' : '';
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

function createPointEditDescriptionTeplate(pointDescription) {
  const {description, pictures} = pointDescription;
  //console.log(pointDescription);
  return (`${pointDescription ? `<section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

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
  const {
    basePrice,
    dateFrom,
    dateTo,
    type,
    offers: offersId,
    destination: destinationId,
    isDisabled,
    isSaving,
    isDeleting
  } = point;
  const sities = destinations.map((item) => item.name);
  // const overPrice () {}
  const typeOffers = offers.find((item) => item.type === type.toLowerCase()).offers || [];
  const pointDestination = destinations.find((item) => item.id === destinationId) || '';
  const isPointId = point.hasOwnProperty('id');

  const offerTemplate = createPointEditOfferTemplate(typeOffers, offersId); // offersId = point.offers?
  const destinationTemplate = createPointEditDescriptionTeplate(pointDestination);

  const btnsTemplate = createBtnsTemplate(isDisabled, isSaving, isDeleting, isPointId);
  const dateTimeStart = humanizePointDate(dateFrom, DATETIME_FORMAT_NEW);
  const dateTimeEnd = humanizePointDate(dateTo, DATETIME_FORMAT_NEW);

  return (`<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
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
                    ${createTypeItemTemplate(type)}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
                value="${he.encode(pointDestination.name || '')}" list="destination-list-1" required
                ${isDisabled ? 'disabled' : ''}>
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
                <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${he.encode(basePrice.toString())}">
              </div>


                ${btnsTemplate}

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
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point = DEFAULT_POINT, destinations, offers, onFormSubmit, onClick, onDeleteClick}) {

    super();
    this._setState(PointEditView.parsePointToState(point));

    this.#destinations = destinations;
    this.#offers = offers;

    this.#handleFormSubmit = onFormSubmit;
    this.#onCLick = onClick;
    this.#handleDeleteClick = onDeleteClick;

    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate(this._state, this.#destinations, this.#offers);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более не нужный календарь
  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }


  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    if (this._state.id) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#clickHandler);
    }
    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group') // change type
      .addEventListener('change', this.#changeTypePointHandler);
    this.element.querySelector('input[list="destination-list-1"]') // input city/name destination
      .addEventListener('change', this.#changeNameDestinationHandler);
    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#changePriceHandler);
    if (Boolean(this._state.offers) !== false) {
      this.element.querySelector('.event__section--offers')
        .addEventListener('change', this.#checkOffersHandler);
    }
    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteClickHandler);


    this.#setDatepicker();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#onCLick();
  };

  #changeTypePointHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
    this._setState({
      type: evt.target.value,
      offers: [],
    });
  };

  #changeNameDestinationHandler = (evt) => {
    evt.preventDefault();
    const city = evt.target.value;
    const isPointDestination = this.#destinations.map((item) => item.name).includes(city);
    const pointDest = this.#destinations.find((item) => item.name === city);
    this._setState({
      destination: pointDest.id,
    });
    this.updateElement({
      destination: isPointDestination ? pointDest.id : '',
    });
  };

  #dateFromHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom,
    });
    this.#datepickerTo.set('minDate', userDateFrom);
  };

  #dateToHandler = ([userDateTo]) => {
    this.updateElement({
      dateTo: userDateTo,
    });
    this.#datepickerFrom.set('maxDate', userDateTo);
  };

  #changePriceHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
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

  #setDatepicker() {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      minuteIncrement: 1,
      enableTime: true,
      dateFormat: 'd/m/y H:i',
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        dateFormat: 'd/m/Y',
        maxDate: this._state.dateTo,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromHandler,
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        dateFormat: 'd/m/Y',
        minDate: this._state.dateFrom,
        defaultDate: this._state.dateTo,
        onClose: this.#dateToHandler,
      }
    );

  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point,
      hasOffer: point.type !== '',
      hasDestination: point.destination !== '',
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    if (!point.hasOffer) {
      point.offers = [];
    }

    if (!point.hasDestination) {
      point.destination = '';
    }

    delete point.hasOffer;
    delete point.hasDestination;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;


    return point;
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

}
