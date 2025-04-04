import dayjs from 'dayjs';
import { SortType } from '../const.js';
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

function sortDatePointDown(pointA, pointB) {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function sortPricePoint(pointA, pointB) {
  const weight = getWeightForNullData(pointA.basePrice, pointB.basePrice);

  return weight ?? pointA.basePrice - pointB.basePrice;
}

function sortTimeTrip(pointA, pointB) {
  const durationA = getDuration(pointA.dataFrom, pointA.dataTo);
  const durationB = getDuration(pointB.dataFrom, pointB.dataTo);
  const weight = getWeightForNullData(durationA, durationB);

  return weight ?? durationA - durationB;
}

const sort = {
  [SortType.DAY]: (pointA, pointB) => sortDatePointDown(pointA, pointB),
  [SortType.TIME]: (pointA, pointB) => sortTimeTrip(pointA, pointB),
  [SortType.PRICE]: (pointA, pointB) => sortPricePoint(pointA, pointB)
};

export { sort, sortDatePointDown, sortPricePoint, sortTimeTrip };
