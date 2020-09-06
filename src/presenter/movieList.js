import Films from "../view/films.js";
import FilmsList from "../view/films-list.js";
import FilmsListExtra from "../view/films-list-extra.js";
import FilmsListContainer from "../view/films-list-container.js";
import ShowMoreButton from "../view/button.js";
import NoDataHeading from "../view/no-data-heading.js";
import DataReceivedHeading from "../view/data-received-heading.js";
import {render, RenderPosition} from "../utils/render.js";
import {mockFilmsList} from "../mock/mockFilms.js";
import {AMOUNT_FILMS_LIST_EXTRA, AMOUNT_FILM_CARDS_BY_STEP, AMOUNT_FOLOWING_FILM_CARDS, FILMS_COUNT} from "../constants.js";
import {main, clearFooterStatistics, footerStatistics} from "../main.js";
import FilmCard from "../view/film-card.js";
import FooterStatistics from "../view/foooter-statistics.js";

export default class MovieList {
  constructor(container) {
    this._container = container;

    this._films = new Films();
    this._filmsList = new FilmsList();
    this._filmsContainer = new FilmsListContainer();
    this._showMoreButton = new ShowMoreButton();
    this._dataReceivedHeading = new DataReceivedHeading();
    this._noDataHeading = new NoDataHeading();
    this._amountRenderedFilmCards = 0;
  }

  init(movies) {
    this._movies = movies.slice();
    render(this._container, this._films, RenderPosition.BEFOREEND);
    render(this._films, this._filmsList, RenderPosition.AFTERBEGIN);
    render(this._filmsList, this._filmsContainer, RenderPosition.BEFOREEND);

    this._renderDataRecievedHeading();
    this._renderShowMoreButton();
    this._renderExtraFilmsContainer();
    this._renderMainFilmsCard(this._movies);
    this._renderFollowingFilmCards(this._movies);
  }

  _renderDataRecievedHeading() {
    if (mockFilmsList && mockFilmsList.length > 0) {
      render(this._filmsList, this._dataReceivedHeading, RenderPosition.AFTERBEGIN);
      for (let i = 0; i < AMOUNT_FILMS_LIST_EXTRA; i++) {
        render(this._films, new FilmsListExtra(i), RenderPosition.BEFOREEND);
      }
    } else {
      render(this._filmsList, this._noDataHeading, RenderPosition.AFTERBEGIN);
    }
  }

  _renderExtraFilmsContainer() {
    const [...filmsListExtra] = this._container.querySelectorAll(`.films-list--extra`);
    filmsListExtra.forEach((elem) => {
      render(elem, new FilmsListContainer(), RenderPosition.BEFOREEND);
    });
  }

  _getContainersForRendeerFilmCard() {
    const [mainFilmsListContainer, ratedFilmsListContainer, commentedFilmsListContainer] = main.querySelectorAll(`.films-list__container`);
    return {
      MAIN_CONTAINER: mainFilmsListContainer,
      RATED_CONTAINER: ratedFilmsListContainer,
      COMMENTED_CONTAINER: commentedFilmsListContainer
    };
  }

  _renderShowMoreButton() {
    if (AMOUNT_FILM_CARDS_BY_STEP < FILMS_COUNT && mockFilmsList.length) {
      render(this._filmsList, this._showMoreButton, RenderPosition.BEFOREEND);

      this._showMoreButton.setClickHandler(() => {
        clearFooterStatistics();
        this._renderMainFilmsCard(mockFilmsList.slice(0, this._amountRenderedFilmCards + AMOUNT_FILM_CARDS_BY_STEP));
        if (mockFilmsList.length <= this._amountRenderedFilmCards) {
          this._showMoreButton.removeElement();
        }
      });
    }
  }

  _getTargetsToClick(location) {
    const [...renderedFilmCards] = location.querySelectorAll(`.film-card`);
    const [...titles] = renderedFilmCards.map((elem) => elem.querySelector(`.film-card__title`));
    const [...posters] = renderedFilmCards.map((elem) => elem.querySelector(`.film-card__poster`));
    const [...comments] = renderedFilmCards.map((elem) => elem.querySelector(`.film-card__comments`));

    return {
      renderedFilmCard: renderedFilmCards,
      title: titles,
      poster: posters,
      comments,
    };
  }

  _renderMainFilmsCard(cards) {
    for (let i = this._amountRenderedFilmCards; i < AMOUNT_FILM_CARDS_BY_STEP + this._amountRenderedFilmCards; i++) {
      let filmCard = new FilmCard(cards[i]);
      if (cards[i]) {
        render(this._getContainersForRendeerFilmCard().MAIN_CONTAINER, filmCard, RenderPosition.BEFOREEND);
        filmCard.addClickHandler(i, this._getContainersForRendeerFilmCard().MAIN_CONTAINER);
      } else if (this._showMoreButton) {
        this._showMoreButton.removeElement();
      }
    }
    this._amountRenderedFilmCards += AMOUNT_FILM_CARDS_BY_STEP;
    render(footerStatistics, new FooterStatistics(mockFilmsList.length - this._amountRenderedFilmCards), RenderPosition.BEFOREEND);

  }

  _renderFollowingFilmCards(cards) {
    const commentedCards = cards.slice();
    commentedCards
        .sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
        .filter((elem, index) => index < AMOUNT_FOLOWING_FILM_CARDS)
        .forEach((elem, index) => {
          let filmCard = new FilmCard(commentedCards[index]);
          render(this._getContainersForRendeerFilmCard().COMMENTED_CONTAINER, filmCard, RenderPosition.BEFOREEND);
          filmCard.addClickHandler(index, this._getContainersForRendeerFilmCard().COMMENTED_CONTAINER);
        });

    const ratedCards = cards.slice();
    ratedCards
        .sort((a, b) => a.rating > b.rating ? -1 : 1)
        .filter((elem, index) => index < AMOUNT_FOLOWING_FILM_CARDS)
        .forEach((elem, index) => {
          let filmCard = new FilmCard(ratedCards[index]);
          render(this._getContainersForRendeerFilmCard().RATED_CONTAINER, filmCard, RenderPosition.BEFOREEND);
          filmCard.addClickHandler(index, this._getContainersForRendeerFilmCard().RATED_CONTAINER);
        });
  }
}
