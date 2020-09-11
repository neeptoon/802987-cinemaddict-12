export const sortRating = (movies1, movies2) => {
  return movies1.rating - movies2.rating;
};

export const sortDate = (movies1, movies2) => {
  return movies1.publishYear - movies2.publishYear;
};
