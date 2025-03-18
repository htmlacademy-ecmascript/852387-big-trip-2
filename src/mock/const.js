const POINTS_COUNT = 9;
const OFFERS_COUNT = 6;
const PICTURES_COUNT = 6;

const TYPES = [
  'Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight',
  'Check-in', 'Sightseeing', 'Restaurant'
];

const CITIES = ['Chamonix', 'Bath', 'Liverpool', 'Barcelona', 'Singapore', 'Dallas', 'Caracas', 'Moscow', 'SPB'];

const TITLE_OFFERS = ['Upgrade to a business class', 'Add luggage', 'conditioner', 'WI-FI',
  'Switch to comfort', 'Order an Uber', 'Rent a car', 'Add breakfast', 'Travel by train',
  'Choose places', 'Choose the radio station'];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.'
];

const PICTURE_DESCRIPTIONS = [
  'Sunny beach, sand dunes.',
  'Forest path, rustle of leaves.',
  'Raindrops, window of a rainy day.',
  'Mountains, melting snow, fresh air.',
  'Floral bouquet, bright petals.',
  'Starry sky, silent dreams.',
  'Cozy fireplace, flickering fire.',
  'The old bridge, the river of the century.',
  'Night city, lights and shadows.',
  'Red sunset, the farewell of the sun.',
  'Summer thunderstorm, silver lightning.',
  'American diner, noisy breakfast.',
  'Stormy sea, salty wind.',
  'Rainbow, after the rain.',
  'A smiling child, a world of carefree.',
  'Soft carpet, cozy slippers.',
  'Ancient architecture, the greatness of history.',
  'Spring garden, the flowering of tenderness.',
  'Winter landscape, snowy silence.',
  'Guitar, the melody of peace.',
  'Coffee cup, morning ritual.',
  'Festive fireworks, rainbow of lights.',
  'Moonlight, a gentle fairy tale.',
  'Milk, fresh bread roll.',
  'An ancient book, mysterious pages.'
]; //+

const getDefaultPoint = () => ({
  basePrice: 0,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: 0,
  isFavorite: false,
  offers: [],
  type: TYPES[0]
});

export { POINTS_COUNT, OFFERS_COUNT, PICTURES_COUNT, TYPES, CITIES, DESCRIPTIONS,
  PICTURE_DESCRIPTIONS, TITLE_OFFERS, getDefaultPoint };
