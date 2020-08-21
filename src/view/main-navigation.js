import AbstractClass from "./abstract";

const createMainNavigationHTML = (filter) => {
  const [, watchlist, history, favorites] = filter;
  const upperCaseString = (word) => word[0].toUpperCase() + word.slice(1);
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">${upperCaseString(watchlist.name)} <span class="main-navigation__item-count">${watchlist.count}</span></a>
      <a href="#history" class="main-navigation__item">${upperCaseString(history.name)} <span class="main-navigation__item-count">${history.count}</span></a>
      <a href="#favorites" class="main-navigation__item">${upperCaseString(favorites.name)} <span class="main-navigation__item-count">${favorites.count}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class MainNavigation extends AbstractClass {
  constructor(filter) {
    super();
    this._element = null;
    this._filter = filter;
  }

  getTemplate() {
    return createMainNavigationHTML(this._filter);
  }

}


