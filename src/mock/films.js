import { getRandomInteger, getRandomFraction, shuffleArray, uniteSeveralThingsIntoArray } from "../utils.js";


const FILMS_COUNT = 15;
const MIN_COMMENT = 0;
const MAX_COMMENT = 5;

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

  return Number(getRandomFraction(MIN_RATING, MAX_RATING));
};

const getPublishFilmDate = () => {
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

const getGenre = () => {
  const genres = [`Fantasy`, `Action`, `Comedy`, `Tragedy`, `Porn`];
  const randomGenres = shuffleArray(genres)
    .slice(0, getRandomInteger(1, genres.length - 1));

  const detailedGenres = Object.create({}, {
    title: {
      get() {
        return randomGenres.length > 1 ? `Genres` : `Genre`;
      }
    },
    genres: {
      value: randomGenres
    }
  });
  return detailedGenres;
};

const generateFilm = () => {
  return {
    name: getName(),
    image: `./images/posters/${getImage()}`,
    description: `${getDescription()}`,
    rating: getRating(),
    publishYear: getPublishFilmDate(),
    duration: getDuration(),
    comments: uniteSeveralThingsIntoArray(generateComment, getRandomInteger(MIN_COMMENT, MAX_COMMENT)),
    genre: getGenre(),
  };
};


const getText = () => {
  const texts = [`Боже, как скучно`, `Я плакал!`, `Ацтой!`, `Великолепная режиссура!!`, `Мне норм....`, `Телки ничо`, `Ничо не понял`, `Что это было!?`];
  return texts[getRandomInteger(0, texts.length - 1)];
};

const getAuthor = () => {
  const authors = [`Джонни Бой`, `Летающий панцырь`, `Свияга`, `Толстый Ленни`, `Пучок`, `Толька Ручник`, `Смеющийся глупец`, `Осёл с повозкой`, `Пенёк`, `Сын маминой подруги`, `Кремлебот`, `Яйцо рыбы`, `Молодец-огурец`, `Шнырь`];

  return authors[getRandomInteger(0, authors.length - 1)];
};

const getEmoji = () => {
  const emojies = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];
  return emojies[getRandomInteger(0, emojies.length - 1)];
};

const getCommentDate = () => {
  const timeOfComments = [`вчера`, `сегодня`, `позавчера`, `3 года назад`, `15 минут назад`, `вчера вечером`, `сегодня утром`];

  return timeOfComments[getRandomInteger(0, timeOfComments.length - 1)];
};

const generateComment = () => {
  return {
    text: getText(),
    author: getAuthor(),
    time: getCommentDate(),
    emoji: `./images/emoji/${getEmoji()}`
  };
};

export const mockFilmsList = uniteSeveralThingsIntoArray(generateFilm, FILMS_COUNT);

console.log(mockFilmsList[0]);
