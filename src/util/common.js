

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

function getCapitalizeWord(word) {
  return word.replace(/^./, (char) => char.toUpperCase());
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function updateItem(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export { getRandomArrayElement, getRandomInteger, createIdGenerator,
  getTimeFromMins, getIdList, isTrue, getMultipleRandom, getCapitalizeWord,
  randomDate, updateItem };
