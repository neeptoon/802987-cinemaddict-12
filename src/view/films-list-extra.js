import AbstractClass from './abstract.js';

const createFilmsListExtraHTML = (index) => {
  const filmsListExtraHeaders = [`Top rated`, `Most commented`];
  return `<section class="films-list--extra">
  <h2 class="films-list__title">${filmsListExtraHeaders[index]}</h2>
    </section >`;
};

export default class FilmsListExtra extends AbstractClass {
  constructor(index) {
    super();
    this._element = null;
    this._index = index;
  }

  getTemplate() {
    return createFilmsListExtraHTML(this._index);
  }
}
