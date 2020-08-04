
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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

const generateFilm = () => {
  return {
    name: getName(),
    image,
    description: `${getDescription()}.`,
    comment,
    rating,
    publishYear,
    genre,
    duration,
  };
};

