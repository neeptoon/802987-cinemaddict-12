
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomFraction = (a = 0, b = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  let fraction = lower + Math.random() * (upper - lower + 1);
  return fraction.toFixed(1);
};

const getName = () => {
  const names = [`Волки`, `Овцы`, `Снег`, `Такси`, `Билет`, `Трамвай`, `Зеленый слоник`, `Вишневый загар`, `Быстрый самолет`, `Уголек`, `Паста из баклажанов`, `Красный пожар`, `Коммунистический рассвет`, `Стрелец`, `Коровий Бунт`, `Ночной поезд`];

  return names[getRandomInteger(0, names.length - 1)];
};

const getDescription = () => {
  const MIN_AMOUNT_SENTENCE = 1;
  const MAX_AMOUNT_SENTENCE = 5;
  const someText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  return someText
    .split(`.`)
    .slice(0, getRandomInteger(MIN_AMOUNT_SENTENCE, MAX_AMOUNT_SENTENCE + 1))
    .join(`.`);
};

const getImage = () => {
  const images = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];

  return images[getRandomInteger(0, images.length - 1)];
};

const getRating = () => {
  const MIN_RATING = 0;
  const MAX_RATING = 10;

  return getRandomFraction(MIN_RATING, MAX_RATING);
};

const getDate = () => {
  const MIN_YEAR = 1965;
  const MAX_YEAR = 2020;

  const currentDate = new Date();

  currentDate.setFullYear(getRandomInteger(MIN_YEAR, MAX_YEAR));

  return new Date(currentDate).getFullYear();
};

const getDuration = () => {
  const MIN_HOUR_DURATION = 0;
  const MAX_HOUR_DURATION = 2;
  const MIN_MINUTES_DURATION = 0;
  const MAX_MINUTES_DURATION = 59;

  const hoursDuration = getRandomInteger(MIN_HOUR_DURATION, MAX_HOUR_DURATION);
  const minutesDuration = getRandomInteger(MIN_MINUTES_DURATION, MAX_MINUTES_DURATION);
  if (hoursDuration && minutesDuration) {
    return `${hoursDuration}h ${minutesDuration}m`;
  } else if (!hoursDuration && !minutesDuration) {
    return `1h 35m`;
  } else if (!hoursDuration && minutesDuration) {
    return `${minutesDuration}m`;
  }
  return `${hoursDuration}`;
};

const generateFilm = () => {
  return {
    name: getName(),
    image: `./images/posters/${getImage()}`,
    description: `${getDescription()}.`,
    comment,
    rating: getRating(),
    publishYear: getDate(),
    genre,
    duration: getDuration(),
  };
};
