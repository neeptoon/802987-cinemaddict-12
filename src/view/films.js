import {createElement} from "../utils.js";

const createFilmsHTML = () =>
  `<section class="films"></section>`;

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsHTML();
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
