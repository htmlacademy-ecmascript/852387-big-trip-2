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

function getIdList(arr) {
  return arr.map((el) => (el.id));
}

export { getRandomArrayElement, getRandomInteger, createIdGenerator,
  humanizePointDate, DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT,
  getIdList };
