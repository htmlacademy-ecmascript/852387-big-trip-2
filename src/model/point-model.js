import Observble from '../framework/observable.js';
//import { getRandomPoint } from '../mock/point.js';
//import { mockDestinations } from '../mock/destination.js';
//import { mockOffers } from '../mock/offer.js';

//const POINT_COUNT = 5;
export default class PointsModel extends Observble {
  #pointsApiService = null;
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
    // this.#pointsApiService.points.then((points) => {
    // console.log(points.map(this.#adaptToClient));
    // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
    // а ещё на сервере используется snake_case, а у нас camelCase.
    // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
    // Есть вариант получше - паттерн "Адаптер"
    //});

    //this.#destinationsApiService = destinationsApiServise;
    // this.#pointsApiService.destinations.then((destinations) => {
    // console.log(destinations);
    // });

    //this.#offersApiServise = offersApiServise;
    // this.#pointsApiService.offers.then((offers) => {
    // console.log(offers);
    // });

    // this.#points = [];
    // this.#destinations = [];
    // this.#offers = [];
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);

      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;

      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;
    } catch(err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }


  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      // На клиенте дата хранится как экземпляр Date,
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
