import AbstractClass from "./abstract.js";

const createShowMoreButtonHTML = () =>
  `<button class="films-list__show-more">Show more</button>`;


export default class ShowMoreButton extends AbstractClass {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreButtonHTML();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}
