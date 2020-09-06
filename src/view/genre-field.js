import AbstractClass from "./abstract";

const createGenreFieldHTML = (genres) => {
  return `<span class="film-details__genre">${genres}</span>`;
};


export default class GenreField extends AbstractClass {
  constructor(card) {
    super();
    this._element = null;
    this._card = card;
  }

  getTemplate() {
    return createGenreFieldHTML(this._card);
  }

}
