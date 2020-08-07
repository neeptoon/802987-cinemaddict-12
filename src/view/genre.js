export const createGenreHTML = (card) => {
  const { genre } = card;
  return `<tr class="film-details__row">
    <td class="film-details__term">${genre.title}</td>
    <td class="film-details__cell">
      <span class="film-details__genre">Drama</span>
      <span class="film-details__genre">Film-Noir</span>
      <span class="film-details__genre">Mystery</span></td>
  </tr>`;
};
