import { FilterType } from '../const.js';
import { isFurutePoint, isPesentPoint, isPastPoint } from '../utils/point.js';

// const filter = {
// everything: (point) => point,
// future: (point) => isFurutePoint(point.dateFrom),
// present: (point) => isPesentPoint(point.dateFrom, point.dateTo),
// past: (point) => isPastPoint(point.dateTo),
// };

const getFilterPoints = (items, type) => {
  switch (type) {
    case FilterType.EVERYTHING:
      return items;
    case FilterType.FUTURE:
      return items.filter((point) => isFurutePoint(point.dateFrom));
    case FilterType.PRESENT:
      return items.filter((point) => isPesentPoint(point.dateFrom, point.dateTo));
    case FilterType.PAST:
      return items.filter((point) => isPastPoint(point.dateTo));
  }
  return items;
};

export { getFilterPoints };
