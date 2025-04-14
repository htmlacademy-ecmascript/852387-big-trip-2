import AbstractView from '../framework/view/abstract-view.js';

const getInfoTemplate = ({ destinationsInfo, datesInfo, priceInfo }) => `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${destinationsInfo}</h1>

              <p class="trip-info__dates">${datesInfo}</p>
            </div>

            <p class="trip-info__cost">
              Total: €&nbsp;<span class="trip-info__cost-value">${priceInfo}</span>
            </p>
          </section>`;


export default class PointsInfoView extends AbstractView {
  #infoData = null;

  constructor({ infoData }) {
    super();
    this.#infoData = infoData;
  }

  get template() {
    return getInfoTemplate({ ...this.#infoData });
  }
}
