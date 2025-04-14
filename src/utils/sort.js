import dayjs from 'dayjs';
import { getDuration } from './point.js';

// Функция помещает задачи без даты в конце списка,
// возвращая нужный вес для колбэка sort
function getWeightForNullData(dataA, dataB) {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
}

const sortPoints = {

  DAY: (points) => points.slice().sort((pointA, pointB) => dayjs(pointA.dateFrom) - dayjs(pointB.dateFrom)),

  PRICE: (points) => points.slice().sort((pointA, pointB) => pointB.basePrice - pointA.basePrice),

  TIME: (points) => points.slice().sort((pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom)))
};
// function sortDate(pointA, pointB) {
//
  // return dayjs(pointA.dateFrom) - (dayjs(pointB.dateFrom));
// }
//
// [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
// [FilterType.FUTURE]: (points) => points.filter((point) => isFurutePoint(point.dateFrom)),
// [FilterType.PRESENT]: (points) => points.filter((point) => isPesentPoint(point.dateFrom, point.dateTo)),
// [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point.dateTo)),
// };

function sortDate(pointA, pointB) {
  const weight = getWeightForNullData(pointB.dateFrom, pointA.dateFrom);
  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function sortPrice(pointA, pointB) {
  const weight = getWeightForNullData(pointA.basePrice, pointB.basePrice);
  return weight ?? pointB.basePrice - pointA.basePrice;
}

function sortTime(pointA, pointB) {
  const durationA = getDuration(pointA.dateFrom, pointA.dateTo);
  const durationB = getDuration(pointB.dateFrom, pointB.dateTo);
  const weight = getWeightForNullData(durationB, durationA);
  return weight ?? durationB - durationA;
}

//const sortNameAdapter = (sortName) => sortName.toUpperCase().replace('-', '_');

export { sortPoints, sortDate, sortPrice, sortTime};
