import Observble from '../framework/observable.js';
import { UpdateType } from '../const.js';
export default class PointsModel extends Observble {
  #pointsApiService = null;
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
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

  async init() {
    try {

      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);

      const destinations = await this.#pointsApiService.destinations;
      this.#destinations = destinations;

      const offers = await this.#pointsApiService.offers;
      this.#offers = offers;
      // await Promise.all([this.#pointsApiService.points,
        // this.#pointsApiService.destinations,
        // this.#pointsApiService.offers]).then(([points, destinations, offers]) => {
        // this.#points = points.map(this.#adaptToClient);
        // this.#destinations = destinations;
        // this.#offers = offers;
      // });

    } catch(err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
      this._notify(UpdateType.FAILED);
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#points = [
        ...this.#points.slice(0, index),
        updatedPoint,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateType, update) {
    try {
      const response = await this.#pointsApiService.addPoint(update);
      const newPoint = this.#adaptToClient(response);
      this.#points = [newPoint, ...this.#points];

      this._notify(updateType, update); ///update ->newPoint
    } catch(err) {
      throw new Error('Can\'t add point');
    }
  }

  getDestinationById(id) {
    return this.destinations.find((dest) => dest.id === id);
  }

  getOffersById(idData, type) {
    const typedOffers = this.offers.find((offer) => offer.type === type).offers;
    return typedOffers.filter((offer) => idData.some((id) => offer.id === id));
  }

  getDestinationsNames() {
    return this.destinations.reduce((destinations, destElement) => {
      destinations.push(destElement.name);
      return destinations;
    }, []);
  }

  async deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }
    try {
      // Обратите внимание, метод удаления задачи на сервере
      // ничего не возвращает. Это и верно,
      // ведь что можно вернуть при удалении задачи?
      await this.#pointsApiService.deletePoint(update);
      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }


  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      // На клиенте дата хранится как экземпляр Date,
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
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
