import { getRandomInteger, createIdGenerator, getRandomArrayElement } from '../util.js';
import { POINTS_COUNT, TYPES } from './const.js';
import { offersCollId } from './offer.js';

const generatePointId = createIdGenerator();
const generateCityId = createIdGenerator();

const createPoint = () => ({
  'id': generatePointId(),
  'base_price': getRandomInteger(0, 2000),
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'destination': generateCityId(),
  'is_favorite': false,
  'offers': offersCollId(), //['1', '2', ]
  'type': TYPES[getRandomInteger(0, TYPES.length)],
});

const mockPoints = Array.from({length: POINTS_COUNT}, createPoint);

// JSON.stringify(mockPoints, null, 2);

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
