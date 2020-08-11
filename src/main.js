import {createProfileHTML} from "./view/profile.js";
import {createMainNavigationHTML} from "./view/main-navigation.js";
import {createSortHTML} from "./view/sort.js";
import {createFilmsHTML} from "./view/films.js";
import {createFilmsListHTML} from "./view/films-list.js";
import {createShowMoreButtonHTML} from "./view/button.js";
import {createFilmsListExtraHTML} from "./view/films-list-extra.js";
import {createFilmsListContainerHTML} from "./view/films-list-container.js";
import {createFilmCardHTML} from "./view/film-card.js";
import {createFooterStatisticsHTML} from "./view/foooter-statistics.js";
import {createFilmDetailsHTML} from "./view/film-details.js";
import {createCommentHTML} from "./view/comment.js";
import {createGenreHTML} from "./view/genre.js";
import {createGenreFieldHTML} from "./view/genre-field.js";
import {generateFilter} from "./view/filter.js";
import {mockFilmsList} from "./mock/films.js";
import {AMOUNT_FILMS_LIST_EXTRA, AMOUNT_MAIN_FILM_CARDS, AMOUNT_RATED_FILM_CARDS, AMOUNT_COMMENT_FILM_CARDS} from "./utils.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
const filmsListExtraHeaders = [`<h2 class="films-list__title">Top rated</h2>`, `<h2 class="films-list__title">Most commented</h2>`];
const preparatedMainFilmCardsForRender = mockFilmsList.slice();
const filters = generateFilter(preparatedMainFilmCardsForRender);

const renderComponent = (elem, where, html) => {
  elem.insertAdjacentHTML(where, html);
};

renderComponent(header, `beforeend`, createProfileHTML());
renderComponent(main, `afterbegin`, createMainNavigationHTML(filters));
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

// render Cards
const [mainFilmsListContainer, ratedFilmsListContainer, commentedFilmsListContainer] = films.querySelectorAll(`.films-list__container`);


const renderMainFilmCards = () => {
  preparatedMainFilmCardsForRender
    .filter((elem, index) => index < AMOUNT_MAIN_FILM_CARDS)
    .forEach((elem) => renderComponent(mainFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));
  preparatedMainFilmCardsForRender.splice(0, AMOUNT_MAIN_FILM_CARDS);
  renderComponent(footerStatistics, `afterbegin`, createFooterStatisticsHTML(preparatedMainFilmCardsForRender));
};

const renderFollowingFilmCards = (cards) => {
  cards
    .slice()
    .sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
    .filter((elem, index) => index < AMOUNT_COMMENT_FILM_CARDS)
    .forEach((elem) => renderComponent(commentedFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));
  cards
    .slice()
    .sort((a, b) => a.rating > b.rating ? -1 : 1)
    .filter((elem, index) => index < AMOUNT_RATED_FILM_CARDS)
    .forEach((elem) => renderComponent(ratedFilmsListContainer, `beforeend`, createFilmCardHTML(elem)));
};


renderMainFilmCards(mockFilmsList);
renderFollowingFilmCards(mockFilmsList);

const showMoreFilmCardsButton = filmsList.querySelector(`.films-list__show-more`);

const buttonClickHandler = () => {
  footerStatistics.firstElementChild.remove();
  renderMainFilmCards();
  if (preparatedMainFilmCardsForRender.length < AMOUNT_MAIN_FILM_CARDS) {
    showMoreFilmCardsButton.classList.add(`visually-hidden`);
  }
};

showMoreFilmCardsButton.addEventListener(`click`, buttonClickHandler);
//


// show popup
const renderedFilmCard = document.querySelector(`.film-card`);
const title = renderedFilmCard.querySelector(`.film-card__title`);
const poster = renderedFilmCard.querySelector(`.film-card__poster`);
const comments = renderedFilmCard.querySelector(`.film-card__comments`);
let popup = null;

const documentKeyDownHandler = function (evt) {
  const ESC_KEYCODE = 27;
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

const openPopup = function (card) {
  renderComponent(main, `beforeend`, createFilmDetailsHTML(card));
  popup = main.querySelector(`.film-details`);
  card.comments.forEach((elem) => renderComponent(popup.querySelector(`.film-details__comments-list`), `beforeend`, createCommentHTML(elem)));
  renderComponent(popup.querySelector(`.film-details__table tbody`), `beforeend`, createGenreHTML(card));
  const [...rowsForProperties] = popup.querySelectorAll(`.film-details__row`);
  const rowForGenres = rowsForProperties[rowsForProperties.length - 1];
  card.genre.genres.forEach((elem) => renderComponent(rowForGenres.querySelector(`.film-details__cell`), `beforeend`, createGenreFieldHTML(elem)));
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
    openPopup(preparatedMainFilmCardsForRender[0]);
  }
};

renderedFilmCard.addEventListener(`click`, cardFilmClickHandler);
//
