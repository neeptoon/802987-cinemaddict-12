import {createElement} from "../utils.js";

const createGenreHTML = (card) => {
  const {genre} = card;
  return `<tr class="film-details__row">
    <td class="film-details__term">${genre.title}</td>
    <td class="film-details__cell"></td>
  </tr>`;
};

export default class Genre {
  constructor(card) {
    this._element = null;
    this.card = card;
  }

  getTemplate(card) {
    return createGenreHTML(card);
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


