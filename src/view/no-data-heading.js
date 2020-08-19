import {createElement} from "../utils.js";

const createNoDataHeadingHTML = () =>
  `<h2 class="films-list__title">There are no movies in our database</h2>`;

export default class NoDataHeading {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createNoDataHeadingHTML();
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
