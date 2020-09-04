export const getTargetsToClick = (location) => {
  const [...renderedFilmCards] = location.querySelectorAll(`.film-card`);
  const [...titles] = renderedFilmCards.map((elem) => elem.querySelector(`.film-card__title`));
  const [...posters] = renderedFilmCards.map((elem) => elem.querySelector(`.film-card__poster`));
  const [...comments] = renderedFilmCards.map((elem) => elem.querySelector(`.film-card__comments`));

  return {
    renderedFilmCard: renderedFilmCards,
    title: titles,
    poster: posters,
    comments,
  };
};
