import { getRandomPoint } from '../mock/point.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offer.js';

const POINT_COUNT = 10;
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
    this.#points = Array.from({length: POINT_COUNT}, getRandomPoint);
    //console.log(this.#points);
    //this.#points = [];
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
