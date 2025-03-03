import {createElement} from '../render.js';

function createPointTemplate() {
  return `<li class="trip-events__item">
            <div class="event">
              <time class="event__date" datetime="2019-03-18"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">18 МАР</font></font></time>
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/flight.png" alt="Значок типа события">
              </div>
              <h3 class="event__title"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Рейс Шамони</font></font></h3>
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="2019-03-18T12:25"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">12:25</font></font></time><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                  —
                  </font></font><time class="event__end-time" datetime="2019-03-18T13:35"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">13:35</font></font></time>
                </p>
                <p class="event__duration"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">01Ч 10М</font></font></p>
              </div>
              <p class="event__price"><font style="vertical-align: inherit;"><span class="event__price-value"><font style="vertical-align: inherit;">160</font></span><font style="vertical-align: inherit;">
                евро&nbsp;</font></font><span class="event__price-value"><font style="vertical-align: inherit;"></font></span>
              </p>
              <h4 class="visually-hidden"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Предложения:</font></font></h4>
              <ul class="event__selected-offers">
                <li class="event__offer">
                  <span class="event__offer-title"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Добавить багаж</font></font></span><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                  +&nbsp;
                    </font></font><span class="event__offer-price"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">50 €</font></font></span>
                </li>
                <li class="event__offer">
                  <span class="event__offer-title"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Переключиться на комфорт </font></font></span><font style="vertical-align: inherit;"><span class="event__offer-price"><font style="vertical-align: inherit;">+80</font></span><font style="vertical-align: inherit;">
                  евро&nbsp;
                  </font></font><span class="event__offer-price"><font style="vertical-align: inherit;"></font></span>
                </li>
              </ul>
              <button class="event__favorite-btn" type="button">
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
  getTemplate() {
    return createPointTemplate();
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
