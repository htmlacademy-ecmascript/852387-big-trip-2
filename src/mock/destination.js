import { DESCRIPTIONS, CITIES } from './const.js';
import { mockPictures } from './pictures.js';

const createDestination = (id) => (
  {
    'id': id,
    'description': DESCRIPTIONS[id],
    'name': CITIES[id],
    'pictures': mockPictures(),
  }
);

const mockDestinations = () => {
  const result = [];
  for (let i = 0; i < CITIES.length; i++) {
    result[i] = createDestination(i);
  }
  return result;
};

const descriptionData = mockDestinations();

export { descriptionData };
