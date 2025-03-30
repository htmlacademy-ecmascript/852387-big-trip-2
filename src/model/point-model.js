import { mockPoints } from '../mock/point.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offer.js';

//const POINT_COUNT = 4;
export default class PointsModel {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor() {
    this.#points = [];
    this.#destinations = [];
    this.#offers = [];
  }

  init() {
    this.#points = mockPoints;
    this.#destinations = mockDestinations();
    this.#offers = mockOffers();
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
}
