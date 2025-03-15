import { getRandomInteger, createIdGenerator, getRandomArrayElement, getIdList } from '../util.js';
import { OFFERS_COUNT, TYPES, TITLE_OFFERS } from './const.js';

const generateOfferId = createIdGenerator();

const createOffer = () => ({
  'id': generateOfferId(),
  'title': getRandomArrayElement(TITLE_OFFERS),
  'price': getRandomInteger(0, 500),
});

const mockOffers = () => Array.from(
  { length: getRandomInteger(0, OFFERS_COUNT) }, createOffer);


const mockTypeOffers = () => {
  const result = [];
  for (let i = 0; i < TYPES.length; i++) {
    result[i] = {
      'type': TYPES[i],
      'offers': mockOffers()
    };
  }
  return result;
};

const offersCollId = () => getIdList(mockOffers());

export { mockTypeOffers, offersCollId };
