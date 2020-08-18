import {createElement} from "../utils.js";

const createFilmsListExtraHTML = (index) => {
  const filmsListExtraHeaders = [`Top rated`, `Most commented`];
  return `<section class="films-list--extra">
  <h2 class="films-list__title">${filmsListExtraHeaders[index]}</h2>
    </section >`;
};

export default class FilmsListExtra {
  constructor(index) {
    this._element = null;
    this.index = index;
  }

  getTemplate(index) {
    return createFilmsListExtraHTML(index);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this.index));
    }

    return this._element;
  }

  removeElement() {
    this._element = 0;
  }
}
