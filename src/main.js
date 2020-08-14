import Profile from "./view/profile.js";
import MainNavigation from "./view/main-navigation.js";
import Sort from "./view/sort.js";
import Films from "./view/films.js";
import FilmsList from "./view/films-list.js";
import ShowMoreButton from "./view/button.js";
import FilmsListExtra from "./view/films-list-extra.js";
import FilmsListContainer from "./view/films-list-container.js";
import FilmCard from "./view/film-card.js";
import FooterStatistics from "./view/foooter-statistics.js";
import FilmDetails from "./view/film-details.js";
import Comment from "./view/comment.js";
import Genre from "./view/genre.js";
import GenreField from "./view/genre-field.js";
import {generateFilter} from "./view/filter.js";
import {mockFilmsList} from "./mock/films.js";
import {AMOUNT_FILMS_LIST_EXTRA, AMOUNT_MAIN_FILM_CARDS, AMOUNT_RATED_FILM_CARDS, AMOUNT_COMMENT_FILM_CARDS, FILMS_COUNT} from "./constants.js";
import {renderElement, RenderPosition} from "./utils.js";

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
const preparatedMainFilmCardsForRender = mockFilmsList.slice();
const filters = generateFilter(preparatedMainFilmCardsForRender);

renderElement(header, new Profile().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MainNavigation(filters).getElement(), RenderPosition.AFTERBEGIN);
renderElement(main, new Sort().getElement(), RenderPosition.BEFOREEND);
renderElement(main, new Films().getElement(), RenderPosition.BEFOREEND);

const films = main.querySelector(`.films`);

renderElement(films, new FilmsList().getElement(), RenderPosition.AFTERBEGIN);

const filmsList = films.querySelector(`.films-list`);

renderElement(filmsList, new FilmsListContainer().getElement(), RenderPosition.BEFOREEND);

// render showMoreFilmsButton
if (AMOUNT_MAIN_FILM_CARDS < FILMS_COUNT) {
  renderElement(filmsList, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

  const showMoreFilmCardsButton = filmsList.querySelector(`.films-list__show-more`);

  const buttonClickHandler = () => {
    footerStatistics.firstElementChild.remove();
    renderMainFilmCards();
    if (!preparatedMainFilmCardsForRender.length) {
      showMoreFilmCardsButton.remove();
    }
  };

  showMoreFilmCardsButton.addEventListener(`click`, buttonClickHandler);
}
//

for (let i = 0; i < AMOUNT_FILMS_LIST_EXTRA; i++) {
  renderElement(films, new FilmsListExtra(i).getElement(), RenderPosition.BEFOREEND);
}

const [...filmsListExtra] = films.querySelectorAll(`.films-list--extra`);

filmsListExtra.forEach((elem) => {
  renderElement(elem, new FilmsListContainer().getElement(), RenderPosition.BEFOREEND);
});

// render Cards
const [mainFilmsListContainer, ratedFilmsListContainer, commentedFilmsListContainer] = films.querySelectorAll(`.films-list__container`);

const renderMainFilmCards = () => {
  preparatedMainFilmCardsForRender
    .filter((elem, index) => index < AMOUNT_MAIN_FILM_CARDS)
    .forEach((elem) => renderElement(mainFilmsListContainer, new FilmCard(elem).getElement(), RenderPosition.BEFOREEND));
  preparatedMainFilmCardsForRender.splice(0, AMOUNT_MAIN_FILM_CARDS);
  renderElement(footerStatistics, new FooterStatistics(preparatedMainFilmCardsForRender).getElement(), RenderPosition.BEFOREEND);
};

const renderFollowingFilmCards = (cards) => {
  cards
    .slice()
    .sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
    .filter((elem, index) => index < AMOUNT_COMMENT_FILM_CARDS)
    .forEach((elem) => renderElement(commentedFilmsListContainer, new FilmCard(elem).getElement(), RenderPosition.BEFOREEND));
  cards
    .slice()
    .sort((a, b) => a.rating > b.rating ? -1 : 1)
    .filter((elem, index) => index < AMOUNT_RATED_FILM_CARDS)
    .forEach((elem) => renderElement(ratedFilmsListContainer, new FilmCard(elem).getElement(), RenderPosition.BEFOREEND));
};

renderMainFilmCards(mockFilmsList);
renderFollowingFilmCards(mockFilmsList);
//


// show popup
const renderedFilmCard = document.querySelector(`.film-card`);
const title = renderedFilmCard.querySelector(`.film-card__title`);
const poster = renderedFilmCard.querySelector(`.film-card__poster`);
const comments = renderedFilmCard.querySelector(`.film-card__comments`);
let popup = null;

const fillPopupWithData = (card) => {
  popup = main.querySelector(`.film-details`);
  card.comments.forEach((elem) => renderElement(popup.querySelector(`.film-details__comments-list`), new Comment(elem).getElement(), RenderPosition.BEFOREEND));
  renderElement(popup.querySelector(`.film-details__table tbody`), new Genre(card).getElement(), RenderPosition.BEFOREEND);
  const [...rowsForProperties] = popup.querySelectorAll(`.film-details__row`);
  const rowForGenres = rowsForProperties[rowsForProperties.length - 1];
  card.genre.genres.forEach((elem) => renderElement(rowForGenres.querySelector(`.film-details__cell`), new GenreField(elem).getElement(), RenderPosition.BEFOREEND));
};

const documentKeyDownHandler = function (evt) {
  const ESC_KEYCODE = 27;
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

const openPopup = function (card) {
  renderElement(main, new FilmDetails(card).getElement(), RenderPosition.BEFOREEND);
  fillPopupWithData(card);
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
    openPopup(mockFilmsList[0]);
  }
};

renderedFilmCard.addEventListener(`click`, cardFilmClickHandler);
//
