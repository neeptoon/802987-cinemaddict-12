import { createProfileHTML } from "./view/profile.js";
import { createMainNavigationHTML } from "./view/main-navigation.js";
import { createSortHTML } from "./view/sort.js";
import { createFilmsHTML } from "./view/films.js";
import { createFilmsListHTML } from "./view/films-list.js";
import { createShowMoreButtonHTML } from "./view/button.js";
import { createFilmsListExtraHTML } from "./view/films-list-extra.js";
import { createFilmsListContainerHTML } from "./view/films-list-container.js";
import { createFilmCardHTML } from "./view/film-card.js";
import { createfooterStatisticsHTML } from "./view/statistics.js";
import { createFilmDetailsHTML } from "./view/film-details.js";
import { mockFilmsList } from "./mock/films.js";

const AMOUNT_FILMS_LIST_EXTRA = 2;
const ESC_KEYCODE = 27;
const MAIN_FILM_CARDS = 5;
const RATED_FILM_CARDS = 2;
const COMMENT_FILM_CARDS = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
const filmsListExtraHeaders = [`<h2 class="films-list__title">Top rated</h2>`, `<h2 class="films-list__title">Most commented</h2>`];

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

const [mainFilmsListContainer, ratedFilmsListContainer, commentedFilmsListContainer] = films.querySelectorAll(`.films-list__container`);

mockFilmsList
  .filter((elem, index) => index < MAIN_FILM_CARDS)
  .forEach((elem) => renderComponent(mainFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));

mockFilmsList
  .slice()
  .sort((a, b) => a.rating > b.rating ? -1 : 1)
  .filter((elem, index) => index < RATED_FILM_CARDS)
  .forEach((elem) => renderComponent(ratedFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));

mockFilmsList
  .slice()
  .sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
  .filter((elem, index) => index < COMMENT_FILM_CARDS)
  .forEach((elem) => renderComponent(commentedFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));

renderComponent(footerStatistics, `afterbegin`, createfooterStatisticsHTML());

const renderedFilms = document.querySelectorAll(`.film-card`);

Array.prototype.forEach.call(renderedFilms, (film, index) => {
  const title = film.querySelector(`.film-card__title`);
  const poster = film.querySelector(`.film-card__poster`);
  const comments = film.querySelector(`.film-card__comments`);

  const documentKeyDownHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  const openPopup = function (currentFilm) {
    const popupTemplate = createFilmDetailsHTML(currentFilm);
    renderComponent(main, `beforeend`, popupTemplate);
    document.addEventListener(`keydown`, documentKeyDownHandler);
    document.addEventListener(`click`, documentClickHandler);
  };

  const getPopup = () => document.querySelector(`.film-details`);

  const documentClickHandler = function (evt) {
    const closePopupButton = getPopup().querySelector(`.film-details__close-btn`);
    if (evt.target === closePopupButton) {
      closePopup();
    }
  };

  const closePopup = function () {
    if (getPopup()) {
      getPopup().remove();
    }
    document.removeEventListener(`keydown`, documentKeyDownHandler);
    document.removeEventListener(`click`, documentClickHandler);
  };

  const cardFilmClickHandler = (evt) => {
    if (evt.target === title || evt.target === poster || evt.target === comments) {
      closePopup();
      openPopup(mockFilmsList[index]);
    }
  };

  film.addEventListener(`click`, cardFilmClickHandler);
});


