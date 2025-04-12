import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration' ;
import utc from 'dayjs/plugin/duration';

dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(utc);

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const DATETIME_FORMAT_NEW = 'DD/MM/YY HH:mm';

const DateTemplates = {
  DATE_FORMAT: 'MMM D',
  TIME_FORMAT: 'HH:mm',
  DATETIME_FORMAT: 'YYYY-MM-DDTHH:MM',
  DATETIME_INPUT_FORMAT: 'YY/MM/DD HH:mm',
  ONLY_DATE_FORMAT: 'YYYY-MM-DD'
};

const getTimeFromTemplate = (template, date) => date ? dayjs(date).format(template) : '';

const humanizePointDate = (date) => getTimeFromTemplate(DateTemplates.DATE_FORMAT, date);
const humanizePointTime = (date) => getTimeFromTemplate(DateTemplates.TIME_FORMAT, date);
const getDatetime = (date) => getTimeFromTemplate(DateTemplates.DATETIME_FORMAT, date);
const getOnlyDate = (date) => getTimeFromTemplate(DateTemplates.ONLY_DATE_FORMAT, date);
const addLeadingZero = (number) => number < 10 ? `0${number}` : `${number}`;


// const isDatesEqual = (dateA, dateB) => dayjs(dateA).isSame(dateB);
const getDiffTime = (dateFrom, dateTo) => {

  dateTo = dayjs(dateTo);
  const diffDuration = dayjs.duration(dateTo.diff(dateFrom));
  const days = dateTo.diff(dateFrom, 'days');

  const template = `${days >= 1 ? `${addLeadingZero(days)}[D] ` : ''}${diffDuration.hours() || days >= 1 ? 'HH[H]' : ''} mm[M]`;
  return diffDuration.format(template);
};


function getDuration(date1, date2) {
  return dayjs(date2).diff(dayjs(date1), 'minute');
}

function isSelectedOffers(offers) {
  return offers.length > 0;
}

function isFavoritePoint(data) {
  return data ? 'event__favorite-btn--active' : '';
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

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

//const getDestinationByName = (destinations, destName) => destinations.find((dest) => dest.name === destName);

//const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type).offers;

const getOffersSumm = (fullOffers) => {
  const offersPriceSumm = fullOffers.reduce((offersSumm, offer) => offersSumm + offer.price
    , 0);
  return offersPriceSumm;
};


const toKebabCase = (word) => word.toLowerCase().split(' ').join('-');

const getDestinationByName = (destinations, destName) => destinations.find((dest) => dest.name === destName);

const getOffersByType = (offers, type) => offers.find((offer) => offer.type === type).offers;


function convertToISO(dateTimeString) {

  const [datePart, timePart] = dateTimeString.split(' ');

  const [day, month, year] = datePart.split('/').map(Number);

  const [hours, minutes] = timePart.split(':').map(Number);

  const fullYear = year < 100 ? 2000 + year : year;
  const date = new Date(fullYear, month - 1, day, hours, minutes);

  return date.toISOString();
}


export { DATE_FORMAT, TIME_FORMAT, DATETIME_FORMAT, DATETIME_FORMAT_NEW,
  humanizePointDate, getDuration, isSelectedOffers, isFavoritePoint,
  isFurutePoint, isPesentPoint, isPastPoint, isDatesEqual, getOffersSumm,
  getDatetime, getDiffTime, getOnlyDate, humanizePointTime, convertToISO,
  toKebabCase, getDestinationByName, getOffersByType, DateTemplates, getTimeFromTemplate };
