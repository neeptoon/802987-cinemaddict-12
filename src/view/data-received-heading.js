import {createElement} from "../utils.js";

const createDataReceivedHeadingHTML = () =>
  `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;

export default class DataReceivedHeading {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createDataReceivedHeadingHTML();
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
