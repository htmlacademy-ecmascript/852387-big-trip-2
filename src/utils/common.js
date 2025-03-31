

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function createIdGenerator () {
  let lastGeneratedId = -1;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
}

function isTrue () {
  return getRandomInteger(0, 1);
}

function getTimeFromMins(mins) {
  const hours = Math.trunc(mins / 60);
  const minutes = mins % 60;
  return `${hours}Ч ${minutes}М`;
}

function getIdList(arr) {
  return arr.map((el) => (el.id));
}

function getMultipleRandom(arr, num) {
  const newArr = getIdList(arr);
  const shuffled = [...newArr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}


export { getRandomArrayElement, getRandomInteger, createIdGenerator,
  getTimeFromMins, getIdList, isTrue, getMultipleRandom };
