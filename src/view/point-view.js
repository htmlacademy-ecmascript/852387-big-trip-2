import { createElement } from '../render.js';
import { humanizePointDate, DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT, getDuration, getTimeFromMins, isSelectedOffers, isFavoritePoint } from '../util.js';
import { descriptionData } from '../mock/destination.js';
import { mockTypeOffers } from '../mock/offer.js';

function createOfferTemplate(offers) {

  return (
    `${isSelectedOffers(offers) ?
      `<h4 class="visually-hidden">
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">Предложения:</font>
        </font>
      </h4>
      <ul class="event__selected-offers">
      ${Object.entries(offers).map(([,{price, title}]) =>
      `<li class="event__offer">
        <span class="event__offer-title">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">${title}</font>
          </font>
        </span>
        <font style="vertical-align: inherit;">
          <font style="vertical-align: inherit;">+&nbsp;</font>
        </font>
        <span class="event__offer-price">
          <font style="vertical-align: inherit;">
            <font style="vertical-align: inherit;">${price} €</font>
          </font>
        </span>
      </li>`).join('')}
    </ul>` : ''}`
  );
}

function createPointTemplate(point) {
  const {base_price: price, date_from: dateFrom, date_to: dateTo, destination, is_favorite: isFavorite, type} = point;
  console.log(point);

  const dateStart = humanizePointDate(dateFrom, DATE_FORMAT);
  //const dateEnd = humanizePointDate(dateTo, DATE_FORMAT);
  const timeStart = humanizePointDate(dateFrom, TIME_FORMAT);
  const timeEnd = humanizePointDate(dateTo, TIME_FORMAT);
  const dateTimeStart = humanizePointDate(dateFrom, DATETIME_FORMAT);
  const dateTimeEnd = humanizePointDate(dateTo, DATETIME_FORMAT);

  const duration = getDuration(dateFrom, dateTo);

  const diffTime = getTimeFromMins(duration);

  const destinationName = descriptionData.find((item) => item.id === destination).name;

  const pointTypeOffer = mockTypeOffers().find((offer) => offer.type === point.type);

  const getOffers = createOfferTemplate(pointTypeOffer.offers);

  const addClassBtnFavorite = isFavoritePoint(isFavorite);

  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="${dateStart}"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${dateStart}</font></font></time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Значок типа события">
              </div>
              <h3 class="event__title"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${type} ${destinationName}</font></font></h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${dateTimeStart}"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${timeStart}</font></font></time><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                  —
                  </font></font><time class="event__end-time" datetime="${dateTimeEnd}"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${timeEnd}</font></font></time>
                </p>
                <p class="event__duration"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${diffTime}</font></font></p>
              </div>
              <p class="event__price"><font style="vertical-align: inherit;"><span class="event__price-value"><font style="vertical-align: inherit;">${price}</font></span><font style="vertical-align: inherit;">
                евро&nbsp;</font></font><span class="event__price-value"><font style="vertical-align: inherit;"></font></span>
              </p>

              ${getOffers}

              <button class="event__favorite-btn ${addClassBtnFavorite}" type="button">
                <span class="visually-hidden"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Добавить в избранное</font></font></span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
                </svg>
              </button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Открытое мероприятие</font></font></span>
              </button>
            </div>
          </li>`;
}

export default class PointView {
  constructor({point}) {
    this.point = point;
  }

  getTemplate() {
    return createPointTemplate(this.point);
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
