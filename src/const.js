import { TYPES } from './mock/const.js';

const DEFAULT_POINT = {
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: null,
  isFavorite: false,
  offers: null,
  type: TYPES[0]
};

const FilterType = {
  EVERYTHING: 'everything', // полный список точек маршрута;
  FUTURE: 'future', /* список запланированных точек маршрута, т. е. точек,
                       у которых дата начала события больше текущей даты; */
  PRESENT: 'present', /* список текущих точек маршрута, т. е. точек,
                         у которых дата начала события меньше (или равна) текущей даты,
                         а дата окончания больше (или равна) текущей даты; */

  PAST: 'past', /* список пройденных точек маршрута, т. е. точек,
                   у которых дата окончания маршрута меньше, чем текущая. */
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export { DEFAULT_POINT, FilterType, SortType };
