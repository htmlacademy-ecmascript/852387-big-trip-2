
import { FilterType } from '../const.js';
import { isFurutePoint, isPesentPoint, isPastPoint } from '../utils/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFurutePoint(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPesentPoint(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point.dateTo)),
};

export {filter};
