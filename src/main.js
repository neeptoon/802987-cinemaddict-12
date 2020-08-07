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
import { createCommentHTML } from "./view/comment.js";
import { mockFilmsList } from "./mock/films.js";
import { AMOUNT_FILMS_LIST_EXTRA, ESC_KEYCODE, MAIN_FILM_CARDS, RATED_FILM_CARDS, COMMENT_FILM_CARDS } from "./utils.js";


const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
const filmsListExtraHeaders = [`<h2 class="films-list__title">Top rated</h2>`, `<h2 class="films-list__title">Most commented</h2>`];
const preparatedCards = mockFilmsList.slice();

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

const renderCards = (cards) => {
  cards
    .filter((elem, index) => index < MAIN_FILM_CARDS)
    .forEach((elem) => renderComponent(mainFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));

  cards
    .slice()
    .sort((a, b) => a.rating > b.rating ? -1 : 1)
    .filter((elem, index) => index < RATED_FILM_CARDS)
    .forEach((elem) => renderComponent(ratedFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));

  cards
    .slice()
    .sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
    .filter((elem, index) => index < COMMENT_FILM_CARDS)
    .forEach((elem) => renderComponent(commentedFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));
};

renderCards(preparatedCards);

renderComponent(footerStatistics, `afterbegin`, createfooterStatisticsHTML(mockFilmsList));


// show popup
const renderedFilmCard = document.querySelector(`.film-card`);
const title = renderedFilmCard.querySelector(`.film-card__title`);
const poster = renderedFilmCard.querySelector(`.film-card__poster`);
const comments = renderedFilmCard.querySelector(`.film-card__comments`);
let popup = null;

const documentKeyDownHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};


const openPopup = function (card) {
  renderComponent(main, `beforeend`, createFilmDetailsHTML(card));
  popup = main.querySelector(`.film-details`);
  card.comments.forEach((elem) => renderComponent(popup.querySelector(`.film-details__comments-list`), `beforeend`, createCommentHTML(elem)));
  card.genre.forEach((elem) => renderComponent(popup.querySelector(`.film-details__table`), `beforeend`, createCommentHTML(elem)));
  document.addEventListener(`keydown`, documentKeyDownHandler);
  document.addEventListener(`click`, documentClickHandler);
};


const documentClickHandler = function (evt) {
  const closePopupButton = popup.querySelector(`.film-details__close-btn`);
  if (evt.target === closePopupButton) {
    closePopup();
  }
};

const closePopup = function () {
  if (popup) {
    popup.remove();
  }
  document.removeEventListener(`keydown`, documentKeyDownHandler);
  document.removeEventListener(`click`, documentClickHandler);
};

const cardFilmClickHandler = (evt) => {
  if (evt.target === title || evt.target === poster || evt.target === comments) {
    closePopup();
    openPopup(preparatedCards[0]);
  }
};

renderedFilmCard.addEventListener(`click`, cardFilmClickHandler);
//

