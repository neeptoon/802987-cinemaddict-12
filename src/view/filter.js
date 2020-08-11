const filmsListToFilterMap = {
  allMovies: (filmsList) => filmsList.length,
  watchlist: (filmsList) => filmsList.filter((filmCard) => filmCard.isWatchlist).length,
  history: (filmsList) => filmsList.filter((filmCard) => filmCard.isHistory).length,
  favorites: (filmsList) => filmsList.filter((filmCard) => filmCard.isFavorites).length,
};

export const generateFilter = (filmsList) => {
  return Object.entries(filmsListToFilterMap).map(([filter, countFilms]) => {
    return {
      name: filter,
      count: countFilms(filmsList)
    };
  });
};

