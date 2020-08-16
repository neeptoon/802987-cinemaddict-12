import { createElement } from "../utils.js";

const createFooterStatisticsHTML = (films) =>
  `<p>${films.length} movies inside</p>`;


export default class FilmCard {
  constructor(films) {
    this._element = null;
    this.film = films;
  }

  getTemplate(films) {
    return createFooterStatisticsHTML(films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this.film));
    }

    return this._element;
  }

  removeElement() {
    this._element = 0;
  }
}
