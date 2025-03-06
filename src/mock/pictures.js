import { getRandomInteger, getRandomArrayElement } from '../util.js';
import { PICTURES_COUNT, PICTURE_DESCRIPTIONS } from './const.js';

const createPicture = () => ({
  'src': `https://loremflickr.com/248/152?random=${getRandomInteger(0, 20)}`,
  'description': getRandomArrayElement(PICTURE_DESCRIPTIONS),
});

export const mockPictures = () => Array.from(
  { length: getRandomInteger(0, PICTURES_COUNT) }, createPicture);
