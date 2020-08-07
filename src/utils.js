export const AMOUNT_FILMS_LIST_EXTRA = 2;
export const ESC_KEYCODE = 27;
export const MAIN_FILM_CARDS = 5;
export const RATED_FILM_CARDS = 2;
export const COMMENT_FILM_CARDS = 2;

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomFraction = (a = 0, b = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  let fraction = lower + Math.random() * (upper - lower + 1);
  return fraction.toFixed(1);
};

export const shuffleArray = (array) => {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const uniteSeveralThingsIntoArray = (thing, amountThing) => {
  return new Array(amountThing).fill().map(thing);
};

export const getSomeValue = (arr) => arr[getRandomInteger(0, arr.length - 1)];
