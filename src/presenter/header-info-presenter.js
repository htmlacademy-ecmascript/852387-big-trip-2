import dayjs from 'dayjs';
import { remove, render, RenderPosition, replace } from '../framework/render.js';
import { sortDate } from '../utils/sort.js';
import HeaderInfoView from '../view/header-info-view.js';
import { getOffersSumm } from '../utils/point.js';


export default class HeaderInfoPresenter {
  #pointsModel = null;
  #container = null;
  #infoComponent = null;

  constructor({ pointsModel, container }) {
    this.#pointsModel = pointsModel;
    this.#container = container;

    //this.pointsModel.addObserver(this.#handleModelPoint);
  }

  init(points) {

    if (points.length === 0) {
      remove(this.#infoComponent);
      this.#infoComponent = null;
      return;
    }
    const infoData = this.#getInfo(points);


    const prevInfoComponent = this.#infoComponent;
    this.#infoComponent = new HeaderInfoView({ infoData });


    if (prevInfoComponent === null) {
      render(this.#infoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }


    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);

  }

  #getInfo(points) {
    const infoData = {};
    const sortedPoints = points.sort(sortDate);

    infoData.destinationsInfo = this.#getDestinationsInfo(sortedPoints);
    infoData.datesInfo = this.#getDatesInfo(sortedPoints);
    infoData.priceInfo = this.#getPriceInfo(sortedPoints);

    return infoData;

  }

  #getDestinationsInfo(points) {

    if (!points || points.length === 0) {
      return '';
    }

    const uniqueDestinations = points.reduce((names, point, index) => {
      const cities = this.#pointsModel.getDestinationById(point.destination).name;
      if (names.length === 0) {
        names.push(cities);
      } else if (!(names[index - 1] === cities)) {
        names.push(cities);
      }
      return names;
    }, []);

    if (!uniqueDestinations.length) {
      return '';
    }

    switch (uniqueDestinations.length) {
      case 1:
        return uniqueDestinations[0];
      case 2:
        return `${uniqueDestinations[0]} — ${uniqueDestinations[1]}`;
      case 3:
        return `${uniqueDestinations[0]} — ${uniqueDestinations[1]} — ${uniqueDestinations[2]}`;
      default:
        return `${uniqueDestinations[0]} — ... — ${uniqueDestinations[uniqueDestinations.length - 1]}`;

    }

  }

  #getDatesInfo(points) {
    const dateFrom = dayjs(points[0].dateFrom);
    const dateTo = dayjs(points[points.length - 1].dateTo);
    return `${dateFrom.date()} ${dateFrom.format('MMM')} — ${dateTo.date()} ${dateTo.format('MMM')}`;
  }

  #getPriceInfo(points) {
    const totalOffersSumm = points.reduce((offersSumm, point) => {
      const fullOffers = this.#pointsModel.getOffersById(point.offers, point.type);
      return offersSumm + getOffersSumm(fullOffers);

    }, 0);

    const totalPointsPrice = points.reduce((basePriceSumm, point) => basePriceSumm + point.basePrice, 0);
    return totalOffersSumm + totalPointsPrice;

  }

  // #handleModelPoint = () => {
  // this.init();
  // };

}
