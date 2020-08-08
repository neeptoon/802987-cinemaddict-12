import {getRandomInteger, getRandomFraction, shuffleArray, uniteSeveralThingsIntoArray, getSomeValue} from "../utils.js";

const FILMS_COUNT = 15;
const MAX_COMMENT = 5;
const MIN_COMMENT = 0;

const names = [`Волки`, `Овцы`, `Снег`, `Такси`, `Билет`, `Трамвай`, `Зеленый слоник`, `Вишневый загар`, `Быстрый самолет`, `Уголек`, `Паста из баклажанов`, `Красный пожар`, `Коммунистический рассвет`, `Стрелец`, `Коровий Бунт`, `Ночной поезд`];
const images = [`made-for-each-other.png`, `popeye-meets-sinbad.png`, `sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`];
const comments = [`Боже, как скучно`, `Я плакал!`, `Ацтой!`, `Великолепная режиссура!!`, `Мне норм....`, `Телки ничо`, `Ничо не понял`, `Что это было!?`];
const authors = [`Джонни Бой`, `Летающий панцырь`, `Свияга`, `Толстый Ленни`, `Пучок`, `Толька Ручник`, `Смеющийся глупец`, `Осёл с повозкой`, `Пенёк`, `Сын маминой подруги`, `Кремлебот`, `Яйцо рыбы`, `Молодец-огурец`, `Шнырь`];
const timeOfComments = [`вчера`, `сегодня`, `позавчера`, `3 года назад`, `15 минут назад`, `вчера вечером`, `сегодня утром`];
const emojies = [`angry.png`, `puke.png`, `sleeping.png`, `smile.png`];
const directors = [`John Polson`, `Kevin Worth`, `Andrew Stomatch`, `Ville Haapassalo`, `Martin Luter`, `Kventin Tarantino`, `Guy Richie`];
const writers = [[`Tom Farr`, `Tom Spot`, `Jassie Row`, `Nick Pens`], [`Uma Red`, `Vins Blick`, `Kate Storm`], [`Joe Russel`, `Anton Pack`, `Jack Smith`]];
const actors = [[`Dani de la Orden`, `Ramón Salazar`, `Jorge Torregrossa`, `Sílvia Quer`], [`Itzan Escamilla`, `Guzmán Nunier`, `Ander Munoz`], [`Omar Shanaa`, `Polo Benavent`, `Nadia Shanaa`]];
const countries = [`USA`, `France`, `Italy`, `Russia`, `Mongolya`, `Iraque`, `Palestina`, `England`, `Poland`, `Spain`];

const getDescription = () => {
  const MIN_AMOUNT_SENTENCE = 1;
  const MAX_AMOUNT_SENTENCE = 5;

  const someText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  return someText
    .split(`.`)
    .slice(0, getRandomInteger(MIN_AMOUNT_SENTENCE, MAX_AMOUNT_SENTENCE + 1))
    .join(`.`);
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
    },

    age: {
      get() {
        return randomGenres.includes(`Porn`, 0) ? `18+` : ``;
      }
    }
  });
  return detailedGenres;
};

const generateFilm = () => {
  return {
    name: getSomeValue(names),
    image: `./images/posters/${getSomeValue(images)}`,
    description: `${getDescription()}`,
    rating: getRating(),
    publishYear: getPublishFilmDate(),
    duration: getDuration(),
    comments: uniteSeveralThingsIntoArray(generateComments, getRandomInteger(MIN_COMMENT, MAX_COMMENT)),
    genre: getGenre(),
    director: getSomeValue(directors),
    writers: getSomeValue(writers),
    actors: getSomeValue(actors),
    country: getSomeValue(countries),
  };
};

const generateComments = () => {
  return {
    text: getSomeValue(comments),
    author: getSomeValue(authors),
    time: getSomeValue(timeOfComments),
    emoji: `./images/emoji/${getSomeValue(emojies)}`
  };
};

export const mockFilmsList = uniteSeveralThingsIntoArray(generateFilm, FILMS_COUNT);

