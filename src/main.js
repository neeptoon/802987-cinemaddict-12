"use strict";

const AMOUNT_FILMS_LIST_EXTRA = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

const filmsListExtraHeaders = [`<h2 class="films-list__title">Top rated</h2>`, `<h2 class="films-list__title">Most commented</h2>`];
const filmsCardAmounts = [5, 2, 2];

const createProfileHTML = () =>
  `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;


const createMainNavigationHTML = () =>
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;


const createSortHTML = () =>
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

const createFilmsHTML = () =>
  `<section class="films"></section>`;

const createFilmsListHTML = () =>
  `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    </section >`;

const createShowMoreButtonHTML = () =>
  `<button class="films-list__show-more">Show more</button>`;

const createFilmsListExtraHTML = () =>
  `<section class="films-list--extra">
    </section >`;

const createFilmsListContainerHTML = () =>
  `<div class="films-list__container">
    </div>`;

const createFilmCardHTML = () =>
  `<article class="film-card">
          <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
          <p class="film-card__rating">2.3</p>
          <p class="film-card__info">
            <span class="film-card__year">1964</span>
            <span class="film-card__duration">1h 21m</span>
            <span class="film-card__genre">Comedy</span>
          </p>
          <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
          <a class="film-card__comments">465 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
          </form>
        </article>`;


const createfooterStatisticsHTML = () =>
  `<p>130 291 movies inside</p>`;

const renderComponent = (elem, where, html) => {
  elem.insertAdjacentHTML(where, html);
};

renderComponent(header, `beforeend`, createProfileHTML());
renderComponent(main, `afterbegin`, createMainNavigationHTML());
renderComponent(main, `beforeend`, createSortHTML());
renderComponent(main, `beforeend`, createFilmsHTML());

const films = main.querySelector(`.films`);

renderComponent(films, `afterbegin`, createFilmsListHTML());

const filmsList = films.querySelector(`.films-list`);

renderComponent(filmsList, `beforeend`, createFilmsListContainerHTML());
renderComponent(filmsList, `beforeend`, createShowMoreButtonHTML());

for (let i = 0; i < AMOUNT_FILMS_LIST_EXTRA; i++) {
  renderComponent(films, `beforeend`, createFilmsListExtraHTML());
}

const [...filmsListExtra] = films.querySelectorAll(`.films-list--extra`);

filmsListExtra.forEach((elem, index) => {
  renderComponent(elem, `beforeend`, createFilmsListContainerHTML());
  renderComponent(elem, `afterbegin`, filmsListExtraHeaders[index]);
});

const [...filmsListContainer] = films.querySelectorAll(`.films-list__container`);

filmsListContainer.forEach((elem, index) => {
  for (let i = 0; i < filmsCardAmounts[index]; i++) {
    renderComponent(elem, `afterbegin`, createFilmCardHTML());
  }
});

renderComponent(footerStatistics, `afterbegin`, createfooterStatisticsHTML());
