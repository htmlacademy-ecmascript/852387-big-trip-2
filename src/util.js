import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'HH:mm';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createIdGenerator () {
  let lastGeneratedId = -1;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function humanizePointDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDuration(date1, date2) {
  return dayjs(date2).diff(dayjs(date1), 'minute');
}

function getTimeFromMins(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}Ч ${minutes}М`;
}

function getIdList(arr) {
  return arr.map((el) => (el.id));
}

function isSelectedOffers(offers) {
  return offers.length > 0;
}

export { getRandomArrayElement, getRandomInteger, createIdGenerator,
  humanizePointDate, DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT,
  getTimeFromMins, getDuration, getIdList, isSelectedOffers };
