import {createElement} from "../utils.js";

const createShowMoreButtonHTML = () =>
  `<button class="films-list__show-more">Show more</button>`;


export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreButtonHTML();
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
