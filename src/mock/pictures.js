import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { PICTURES_COUNT, PICTURE_DESCRIPTIONS } from './const.js';

const createPicture = () => ({
  'src': `img/photos/${getRandomInteger(1, 5)}.jpg`,
  'description': getRandomArrayElement(PICTURE_DESCRIPTIONS),
});

export const mockPictures = () => Array.from(
  { length: getRandomInteger(0, PICTURES_COUNT) }, createPicture);
