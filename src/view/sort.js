import AbstractClass from "./abstract.js";
import {SortType} from "../constants.js";

const createSortHTML = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type=${SortType.DEFAULT}>Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SortType.DATE}>Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SortType.RATING}>Sort by rating</a></li>
  </ul>`;

export default class Sort extends AbstractClass {
  constructor() {
    super();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortHTML();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    this._addActiveClass(evt);
  }

  _addActiveClass(evt) {
    const [...buttons] = this.getElement().querySelectorAll(`.sort__button`);
    buttons.forEach((button) => button.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}

