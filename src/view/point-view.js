import AbstractView from '../framework/view/abstract-view.js';
import { getDatetime, getDiffTime, getOnlyDate, humanizePointDate, humanizePointTime } from '../utils/point.js';
import { getCapitalizeWord } from '../utils/common.js';
function createOfferTemplate(pointOffers) {

  return (
    `<ul class="event__selected-offers">
      ${pointOffers.map((offer) =>
      `<li class="event__offer">
        <span class="event__offer-title">
          ${offer.title}
        </span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">
          ${offer.price}
        </span>
      </li>
    `).join('')}
    </ul>`);
}

function createPointTemplate(point, fullDestination, offers) {

  const { basePrice, dateFrom, dateTo, isFavorite, type } = point;

  const isFavoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (`<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${getOnlyDate(dateFrom)}">${humanizePointDate(dateFrom)}</time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Значок типа события">
              </div>
              <h3 class="event__title">${getCapitalizeWord(type)} ${fullDestination.name}</h3>
              <div class="event__schedule">
                <p class="event__time">
                    <time class="event__start-time" datetime="${getDatetime(dateFrom)}">${humanizePointTime(dateFrom)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${getDatetime(dateTo)}">${humanizePointTime(dateTo)}</time>
                  </p>
                <p class="event__duration">${getDiffTime(dateFrom, dateTo)}</p>
              </div>
              <p class="event__price"><span class="event__price-value">${basePrice}</span>
                евро&nbsp;<span class="event__price-value">
              </p>
              <h4 class="visually-hidden">Offers:</h4>

              ${offers.length ? createOfferTemplate(offers) : ''}

              <button class="event__favorite-btn ${isFavoriteClassName}" type="button">
                <span class="visually-hidden">Добавить в избранное</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Открытое мероприятие<</span>
              </button>
            </div>
          </li>`);
}

export default class PointView extends AbstractView {
  #point = null;
  #fullDestination = null;
  #fullOffers = null;
  #handleOpenClick = null;
  #handleFavoriteClick = null;

  constructor({ point, fullDestination, fullOffers, onOpenClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#fullDestination = fullDestination;
    this.#fullOffers = fullOffers;
    this.#handleOpenClick = onOpenClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#openClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate(this.#point, this.#fullDestination, this.#fullOffers);
  }

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleOpenClick();
  };

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this.element.querySelector('button').classList.toggle('event__favorite-btn--active');
    this.#handleFavoriteClick();
  };
}
