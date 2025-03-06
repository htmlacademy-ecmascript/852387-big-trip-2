import { getRandomInteger, createIdGenerator } from '../util.js';
import { OFFERS_COUNT, TYPES } from './const.js';

const generateOfferId = createIdGenerator();

const createOffer = () => ({
  'id': generateOfferId(),
  'title': 'Upgrade to a business class',
  'price': getRandomInteger(0, 500),
});

const mockOffers = () => Array.from(
  { length: getRandomInteger(0, OFFERS_COUNT) }, createOffer);


const mockTypes = () => {
  const result = [];
  for (let i = 0; i < TYPES.length; i++) {
    result[i] = {
      'type': TYPES[i],
      'offers': mockOffers()
    };
  }
  return result;
};

const offersCollId = () => Array.from(mockOffers().keys());

export { mockTypes, offersCollId };
