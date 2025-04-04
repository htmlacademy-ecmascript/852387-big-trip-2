import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

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

function isFurutePoint(data) {
  return dayjs().isBefore(dayjs(data), 'D');
}

function isPesentPoint(dataFrom, dataTo) {
  return dayjs(dataFrom).isSameOrBefore(dayjs(), 'D') && dayjs(dataTo).isSameOrAfter(dayjs(), 'D');
}

function isPastPoint(data) {
  return dayjs().isAfter(dayjs(data), 'D');
}

export { DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT, DATETIME_FORMAT_NEW,
  humanizePointDate, getDuration, isSelectedOffers,
  isFurutePoint, isPesentPoint, isPastPoint };
