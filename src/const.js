const TYPES = [
  'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight',
  'Check-in', 'Sightseeing', 'Restaurant'
];

const CITIES = ['Chamonix', 'Bath', 'Liverpool', 'Barcelona', 'Singapore', 'Dallas', 'Caracas', 'Moscow', 'SPB'];


const DEFAULT_POINT = {
  // id: nanoid(),
  basePrice: '',
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: null,
  isFavorite: false,
  offers: [],
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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { TYPES, CITIES, DEFAULT_POINT, FilterType, SortType, UserAction, UpdateType };
