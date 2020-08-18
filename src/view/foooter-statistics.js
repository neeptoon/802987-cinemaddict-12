import {createElement} from "../utils.js";

const createFooterStatisticsHTML = (amount) =>
  `<p>${amount >= 0 ? amount : 0} movies inside</p>`;


export default class FilmCard {
  constructor(amount) {
    this._element = null;
    this.amount = amount;
  }

  getTemplate(amount) {
    return createFooterStatisticsHTML(amount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this.amount));
    }

    return this._element;
  }

  removeElement() {
    this._element = 0;
  }
}
