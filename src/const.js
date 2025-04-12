const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const TYPES = [
  'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight',
  'Check-in', 'Sightseeing', 'Restaurant'
];

const CITIES = ['Chamonix', 'Bath', 'Liverpool', 'Barcelona', 'Singapore', 'Dallas', 'Caracas', 'Moscow', 'SPB'];


const DEFAULT_POINT = {
  // id: nanoid(),
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'flight',
  isNew: true,
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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  FAILED: 'FAILED',
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {Method, TYPES, CITIES, DEFAULT_POINT, FilterType, SortType, UserAction, UpdateType, Mode, TimeLimit };
