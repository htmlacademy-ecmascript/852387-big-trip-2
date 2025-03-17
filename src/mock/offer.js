import { getRandomInteger, getRandomArrayElement, getIdList, getMultipleRandom } from '../util.js';
import { OFFERS_COUNT, TYPES, TITLE_OFFERS } from './const.js';

const createOffer = () => ({
  'id': getRandomInteger(0, 10),
  'title': getRandomArrayElement(TITLE_OFFERS),
  'price': getRandomInteger(0, 500),
});

const getOffers = () => Array.from(
  { length: OFFERS_COUNT }, createOffer);


const mockOffers = () => {
  const result = [];
  for (let i = 0; i < TYPES.length; i++) {
    result[i] = {
      'type': TYPES[i],
      'offers': getOffers()
    };
  }
  return result;
};

const offersCollId = getIdList(getOffers());
const offersChecked = () => getMultipleRandom(getOffers(), offersCollId.length - 2);

export { mockOffers, offersChecked };
