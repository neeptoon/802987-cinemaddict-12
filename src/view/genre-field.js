import {createElement} from "../utils.js";

const createGenreFieldHTML = (genres) => {
  return `<span class="film-details__genre">${genres}</span>`;
};


export default class GenreField {
  constructor(card) {
    this._element = null;
    this.card = card;
  }

  getTemplate(card) {
    return createGenreFieldHTML(card);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this.card));
    }

    return this._element;
  }

  removeElement() {
    this._element = 0;
  }
}
