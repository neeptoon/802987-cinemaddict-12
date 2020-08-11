export const createGenreHTML = (card) => {
  const {genre} = card;
  return `<tr class="film-details__row">
    <td class="film-details__term">${genre.title}</td>
    <td class="film-details__cell">
  </tr>`;
};
