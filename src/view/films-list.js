import {createElement} from "../utils.js";

const createFilmsListHTML = () =>
  `<section class="films-list">
      
    </section >`;

export default class FilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListHTML();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = 0;
  }
}
