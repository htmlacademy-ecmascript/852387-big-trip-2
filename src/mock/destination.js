import { getRandomArrayElement } from '../util.js';
import { DESCRIPTIONS, CITIES } from './const.js';
import { mockPictures } from './pictures.js';

const createDestination = (id) => (
  {
    'id': id,
    'description': getRandomArrayElement(DESCRIPTIONS),
    'name': CITIES[id],
    'pictures': mockPictures(),
  }
);

export const mockDestinations = () => {
  const result = [];
  for (let i = 0; i < CITIES.length; i++) {
    result[i] = createDestination(i);
  }
  return result;
};
