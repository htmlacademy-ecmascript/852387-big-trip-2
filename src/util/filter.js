
import { FilterType } from '../const.js';
import { isFurutePoint, isPesentPoint, isPastPoint } from '../utils/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFurutePoint(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPesentPoint(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point.dateTo)),

  // [FilterType.ALL]: (tasks) => tasks.filter((task) => !task.isArchive),
  // [FilterType.OVERDUE]: (tasks) => tasks.filter((task) => isTaskExpired(task.dueDate) && !task.isArchive),
  // [FilterType.TODAY]: (tasks) => tasks.filter((task) => isTaskExpiringToday(task.dueDate) && !task.isArchive),
  // [FilterType.FAVORITES]: (tasks) => tasks.filter((task) => task.isFavorite && !task.isArchive),
  // [FilterType.REPEATING]: (tasks) => tasks.filter((task) => isTaskRepeating(task.repeating) && !task.isArchive),
  // [FilterType.ARCHIVE]: (tasks) => tasks.filter((task) => task.isArchive),
};

export {filter};
