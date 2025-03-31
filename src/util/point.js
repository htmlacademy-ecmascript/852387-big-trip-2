import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';
const TIME_FORMAT = 'HH:mm';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const DATETIME_FORMAT_NEW = 'DD/MM/YY HH:mm';

function humanizePointDate(date, format) {
  return date ? dayjs(date).format(format) : '';
}

function getDuration(date1, date2) {
  return dayjs(date2).diff(dayjs(date1), 'minute');
}

function isSelectedOffers(offers) {
  return offers.length > 0;
}

function isFavoritePoint(data) {
  return data ? 'event__favorite-btn--active' : '';
}

export { DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT, DATETIME_FORMAT_NEW,
  humanizePointDate, getDuration, isSelectedOffers, isFavoritePoint };
