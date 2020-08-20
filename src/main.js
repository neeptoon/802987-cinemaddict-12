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
import GenreField from "./view/genre-field.js";
import NoDataHeading from "./view/no-data-heading.js";
import DataReceivedHeading from "./view/data-received-heading.js";
import {generateFilter} from "./view/filter.js";
import {mockFilmsList} from "./mock/mockFilms.js";
import {AMOUNT_FILMS_LIST_EXTRA, AMOUNT_FILM_CARDS_BY_STEP, AMOUNT_FOLOWING_FILM_CARDS, FILMS_COUNT} from "./constants.js";
import {render, RenderPosition} from "./utils.js";


const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);
const preparatedMainFilmCardsForRender = mockFilmsList.slice();
const filters = generateFilter(preparatedMainFilmCardsForRender);
const clearFooterStatistics = () => footerStatistics.firstElementChild.remove();

render(header, new Profile().getElement(), RenderPosition.BEFOREEND);
render(main, new MainNavigation(filters).getElement(), RenderPosition.AFTERBEGIN);
render(main, new Sort().getElement(), RenderPosition.BEFOREEND);
render(main, new Films().getElement(), RenderPosition.BEFOREEND);

const films = main.querySelector(`.films`);

render(films, new FilmsList().getElement(), RenderPosition.AFTERBEGIN);

const filmsList = films.querySelector(`.films-list`);

render(filmsList, new FilmsListContainer().getElement(), RenderPosition.BEFOREEND);

if (mockFilmsList && mockFilmsList.length > 0) {
  render(filmsList, new DataReceivedHeading().getElement(), RenderPosition.AFTERBEGIN);

  for (let i = 0; i < AMOUNT_FILMS_LIST_EXTRA; i++) {
    render(films, new FilmsListExtra(i).getElement(), RenderPosition.BEFOREEND);
  }

  const [...filmsListExtra] = films.querySelectorAll(`.films-list--extra`);

  filmsListExtra.forEach((elem) => {
    render(elem, new FilmsListContainer().getElement(), RenderPosition.BEFOREEND);
  });

} else {
  render(filmsList, new NoDataHeading().getElement(), RenderPosition.AFTERBEGIN);
}


// render showMoreFilmsButton
let showMoreFilmCardsButton = null;

if (AMOUNT_FILM_CARDS_BY_STEP < FILMS_COUNT) {
  render(filmsList, new ShowMoreButton().getElement(), RenderPosition.BEFOREEND);

  showMoreFilmCardsButton = filmsList.querySelector(`.films-list__show-more`);

  const buttonClickHandler = () => {
    clearFooterStatistics();
    renderMainFilmCards(mockFilmsList.slice(0, amountRenderedFilmCards + AMOUNT_FILM_CARDS_BY_STEP));
    if (mockFilmsList.length <= amountRenderedFilmCards) {
      showMoreFilmCardsButton.remove();
    }
  };

  showMoreFilmCardsButton.addEventListener(`click`, buttonClickHandler);
}
//


// render Cards
const [mainFilmsListContainer, ratedFilmsListContainer, commentedFilmsListContainer] = films.querySelectorAll(`.films-list__container`);

export const cardFilmClickHandler = (data, index, location) => (evt) => {
  const targets = getTargetsToClick(location);
  if (evt.target === targets.title[index] || evt.target === targets.poster[index] || evt.target === targets.comments[index]) {
    closePopup();
    openPopup(data);
  }
};

const getTargetsToClick = (location) => {
  const [...renderedFilmCard] = location.querySelectorAll(`.film-card`);
  const [...title] = renderedFilmCard.map((elem) => elem.querySelector(`.film-card__title`));
  const [...poster] = renderedFilmCard.map((elem) => elem.querySelector(`.film-card__poster`));
  const [...comments] = renderedFilmCard.map((elem) => elem.querySelector(`.film-card__comments`));

  return {
    renderedFilmCard,
    title,
    poster,
    comments,
  };
};


let amountRenderedFilmCards = 0;

const renderMainFilmCards = (cards) => {
  for (let i = amountRenderedFilmCards; i < AMOUNT_FILM_CARDS_BY_STEP + amountRenderedFilmCards; i++) {
    let filmCard = new FilmCard(cards[i]);
    if (cards[i]) {
      render(mainFilmsListContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
      filmCard.addHandler(i, mainFilmsListContainer);
    } else if (showMoreFilmCardsButton) {
      showMoreFilmCardsButton.remove();
    }
  }
  amountRenderedFilmCards += AMOUNT_FILM_CARDS_BY_STEP;
  render(footerStatistics, new FooterStatistics(mockFilmsList.length - amountRenderedFilmCards).getElement(), RenderPosition.BEFOREEND);
};

const renderFollowingFilmCards = (cards) => {
  const commentedCards = cards.slice();
  commentedCards
    .sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
    .filter((elem, index) => index < AMOUNT_FOLOWING_FILM_CARDS)
    .forEach((elem, index) => {
      let filmCard = new FilmCard(commentedCards[index]);
      render(commentedFilmsListContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
      filmCard.addHandler(index, commentedFilmsListContainer);
    });

  const ratedCards = cards.slice();
  ratedCards
    .sort((a, b) => a.rating > b.rating ? -1 : 1)
    .filter((elem, index) => index < AMOUNT_FOLOWING_FILM_CARDS)
    .forEach((elem, index) => {
      let filmCard = new FilmCard(ratedCards[index]);
      render(ratedFilmsListContainer, filmCard.getElement(), RenderPosition.BEFOREEND);
      filmCard.addHandler(index, ratedFilmsListContainer);
    });
};

renderMainFilmCards(mockFilmsList);
renderFollowingFilmCards(mockFilmsList);
//

// show popup

let popup = null;

const fillPopupWithData = (card) => {
  popup = main.querySelector(`.film-details`);
  card.comments.forEach((elem) => render(popup.querySelector(`.film-details__comments-list`), new Comment(elem).getElement(), RenderPosition.BEFOREEND));
  const [...rowsForProperties] = popup.querySelectorAll(`.film-details__row`);
  const rowForGenres = rowsForProperties[rowsForProperties.length - 1];
  card.genre.genres.forEach((elem) => render(rowForGenres.querySelector(`.film-details__cell`), new GenreField(elem).getElement(), RenderPosition.BEFOREEND));
};

const documentKeyDownHandler = function (evt) {
  const ESC_KEYCODE = 27;
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

const openPopup = function (card) {
  render(main, new FilmDetails(card).getElement(), RenderPosition.BEFOREEND);
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

//


