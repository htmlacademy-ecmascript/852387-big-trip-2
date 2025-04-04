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

function sortDatePointDown(pointA, pointB) {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);
  return weight ?? dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function sortPricePoint(pointA, pointB) {
  const weight = getWeightForNullData(pointA.basePrice, pointB.basePrice);
  return weight ?? pointB.basePrice - pointA.basePrice;
}

function sortTimeTrip(pointA, pointB) {
  const durationA = getDuration(pointA.dateFrom, pointA.dateTo);
  const durationB = getDuration(pointB.dateFrom, pointB.dateTo);
  const weight = getWeightForNullData(durationB, durationA);
  return weight ?? durationB - durationA;
}

export { sortDatePointDown, sortPricePoint, sortTimeTrip };
