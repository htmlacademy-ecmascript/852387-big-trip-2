import AbstractView from '../framework/view/abstract-view.js';
import { humanizePointDate, DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT, getDuration, isSelectedOffers } from '../utils/point.js';
import { getTimeFromMins } from '../utils/common.js';

function createOfferTemplate(pointOffers) {

  return (
    `${isSelectedOffers(pointOffers) ?
      `<h4 class="visually-hidden">
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">Предложения:</font>
        </font>
      </h4>
      <ul class="event__selected-offers">
      ${pointOffers.map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">${offer.title}</font>
          </font>
        </span>
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">+&nbsp;</font>
        </font>
        <span class="event__offer-price">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">${offer.price} €</font>
          </font>
        </span>
      </li>`).join('')}
    </ul>` : ''}`
  );
}

function createPointTemplate(point, destinations, offers) {

  const {basePrice, dateFrom, dateTo, isFavorite, type, offers: offersId, destination: destinationId} = point;
  const typeOffers = offers.find((item) => item.type === type).offers;
  const pointCheckedOffers = typeOffers.filter((typeOffer) => offersId.includes(typeOffer.id)) || false;
  const pointDestination = destinations.find((item) => item.id === destinationId) || [];

  const dateStart = humanizePointDate(dateFrom, DATE_FORMAT);
  const timeStart = humanizePointDate(dateFrom, TIME_FORMAT);
  const timeEnd = humanizePointDate(dateTo, TIME_FORMAT);
  const dateTimeStart = humanizePointDate(dateFrom, DATETIME_FORMAT);
  const dateTimeEnd = humanizePointDate(dateTo, DATETIME_FORMAT);
  const duration = getDuration(dateFrom, dateTo);
  const diffTime = getTimeFromMins(duration);

  //const addClassBtnFavorite = isFavoritePoint(isFavorite);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  return (`<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${dateStart}"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${dateStart}</font></font></time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Значок типа события">
              </div>
              <h3 class="event__title"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${type} ${pointDestination.name}</font></font></h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${dateTimeStart}"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${timeStart}</font></font></time><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                  —
                  </font></font><time class="event__end-time" datetime="${dateTimeEnd}"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${timeEnd}</font></font></time>
                </p>
                <p class="event__duration"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${diffTime}</font></font></p>
              </div>
              <p class="event__price"><font style="vertical-align: inherit;"><span class="event__price-value"><font style="vertical-align: inherit;">${basePrice}</font></span><font style="vertical-align: inherit;">
                евро&nbsp;</font></font><span class="event__price-value"><font style="vertical-align: inherit;"></font></span>
              </p>

              ${createOfferTemplate(pointCheckedOffers)}

              <button class="${favoriteClassName}" type="button">
                <span class="visually-hidden"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Добавить в избранное</font></font></span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Открытое мероприятие</font></font></span>
              </button>
            </div>
          </li>`
  );
}

export default class PointView extends AbstractView {
  #point = null;
  #destinations = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({ point, destinations, offers, onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#destinations, this.#offers);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
