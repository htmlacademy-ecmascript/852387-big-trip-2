import { getRandomInteger, createIdGenerator, getRandomArrayElement, isTrue, randomDate } from '../utils/common.js';
import { POINTS_COUNT, TYPES } from './const.js';
import { offersChecked } from './offer.js';

const generatePointId = createIdGenerator();
const generateCityId = createIdGenerator();

const createPoint = () => ({
  'id': generatePointId(),
  'basePrice': getRandomInteger(0, 2000),
  'dateFrom': randomDate(new Date(2012, 0, 1), new Date(2035, 0, 1)),
  'dateTo': randomDate(new Date(2020, 0, 1), new Date(2050, 0, 1)),
  //'dateFrom': '2019-07-10T22:55:56.845Z',
  //'dateTo': '2026-07-11T11:22:13.375Z',
  'destination': generateCityId(),
  'isFavorite': isTrue(),
  'offers': offersChecked(), //['1', '2', ]
  'type': TYPES[getRandomInteger(0, TYPES.length - 1)],
});

const mockPoints = Array.from({length: POINTS_COUNT}, createPoint);

// JSON.stringify(mockPoints, null, 2);

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint, mockPoints };
