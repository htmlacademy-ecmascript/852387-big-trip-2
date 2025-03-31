import { getRandomInteger, createIdGenerator, getRandomArrayElement, isTrue } from '../utils/common.js';
import { POINTS_COUNT, TYPES } from './const.js';
import { offersChecked } from './offer.js';

const generatePointId = createIdGenerator();
const generateCityId = createIdGenerator();

const createPoint = () => ({
  'id': generatePointId(),
  'basePrice': getRandomInteger(0, 2000),
  'dateFrom': '2019-07-10T22:55:56.845Z',
  'dateTo': '2019-07-11T11:22:13.375Z',
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
