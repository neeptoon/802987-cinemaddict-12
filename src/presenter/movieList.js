import Films from "../view/films.js";
import FilmsList from "../view/films-list.js";
import FilmsListExtra from "../view/films-list-extra.js";
import FilmsListContainer from "../view/films-list-container.js";
import ShowMoreButton from "../view/button.js";
import Sort from "../view/sort.js";
import NoDataHeading from "../view/no-data-heading.js";
import DataReceivedHeading from "../view/data-received-heading.js";
import {render, RenderPosition} from "../utils/render.js";
import {mockFilmsList} from "../mock/mockFilms.js";
import {AMOUNT_FILMS_LIST_EXTRA, AMOUNT_FILM_CARDS_BY_STEP, AMOUNT_FOLOWING_FILM_CARDS, FILMS_COUNT, SortType} from "../constants.js";
import {main, clearFooterStatistics, footerStatistics} from "../main.js";
import FilmCard from "../view/film-card.js";
import FooterStatistics from "../view/foooter-statistics.js";
import {sortDate, sortRating} from "../utils/sort.js";
import MovieCard from "./movieCard.js";

export default class MovieList {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._films = new Films();
    this._filmsList = new FilmsList();
    this._filmsContainer = new FilmsListContainer();
    this._showMoreButton = new ShowMoreButton();
    this._dataReceivedHeading = new DataReceivedHeading();
    this._noDataHeading = new NoDataHeading();
    this._amountRenderedFilmCards = 0;
    this._currentSortType = SortType.DEFAULT;
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(movies) {
    this._renderSort();
    this._movies = movies.slice();
    this._sourcedMovies = movies.slice();
    render(this._container, this._films, RenderPosition.BEFOREEND);
    render(this._films, this._filmsList, RenderPosition.AFTERBEGIN);
    render(this._filmsList, this._filmsContainer, RenderPosition.BEFOREEND);
    this._renderDataRecievedHeading();
    this._renderExtraFilmsContainer();
    this._renderMainFilmsCard(this._movies);
    this._renderFollowingFilmCards(this._movies);
  }

  _clearFilmsList() {
    this._filmsContainer.getElement().innerHTML = ``;
    this._amountRenderedFilmCards = 0;
  }

  _sortFilmCard(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._movies.sort(sortDate);
        break;
      case SortType.RATING:
        this._movies.sort(sortRating);
        break;
      default:
        this._movies = this._sourcedMovies.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._clearFilmsList();
    this._sortFilmCard(sortType);
    this._renderMainFilmsCard(this._movies);
    clearFooterStatistics();
  }

  _renderSort() {
    render(this._container, this._sort, RenderPosition.BEFOREEND);
    this._sort.setSortTypeChangeHandler(this._handleSortTypeChange);
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

  _getContainersForRenderFilmCard() {
    const [mainFilmsListContainer, ratedFilmsListContainer, commentedFilmsListContainer] = main.querySelectorAll(`.films-list__container`);
    return {
      MAIN_CONTAINER: mainFilmsListContainer,
      RATED_CONTAINER: ratedFilmsListContainer,
      COMMENTED_CONTAINER: commentedFilmsListContainer
    };
  }

  _renderShowMoreButton() {
    if (AMOUNT_FILM_CARDS_BY_STEP < FILMS_COUNT && this._movies.length) {
      render(this._filmsList, this._showMoreButton, RenderPosition.BEFOREEND);

      this._showMoreButton.setClickHandler(() => {
        clearFooterStatistics();
        this._renderMainFilmsCard(this._movies.slice(0, this._amountRenderedFilmCards + AMOUNT_FILM_CARDS_BY_STEP));
        if (this._movies.length <= this._amountRenderedFilmCards) {
          this._showMoreButton.removeElement();
        }
      });
    }
  }

  _renderMainFilmsCard(cards) {
    const container = this._getContainersForRenderFilmCard().MAIN_CONTAINER;
    const movieCard = new MovieCard(container);

    for (let i = this._amountRenderedFilmCards; i < AMOUNT_FILM_CARDS_BY_STEP + this._amountRenderedFilmCards; i++) {
      // let filmCard = new FilmCard(cards[i]);
      if (cards[i]) {
        movieCard.init(cards[i]);
        // render(container, filmCard, RenderPosition.BEFOREEND);
        // filmCard.addClickHandler();
      } else if (this._showMoreButton) {
        this._showMoreButton.removeElement();
      }
    }

    this._amountRenderedFilmCards += AMOUNT_FILM_CARDS_BY_STEP;
    this._renderShowMoreButton();
    render(footerStatistics, new FooterStatistics(mockFilmsList.length - this._amountRenderedFilmCards), RenderPosition.BEFOREEND);
  }

  _renderFollowingFilmCards(cards) {
    const commentedContainer = this._getContainersForRenderFilmCard().COMMENTED_CONTAINER;
    const ratedContainer = this._getContainersForRenderFilmCard().RATED_CONTAINER;
    const commentedCards = cards.slice();
    const ratedCards = cards.slice();

    commentedCards
        .sort((a, b) => a.comments.length > b.comments.length ? -1 : 1)
        .filter((elem, index) => index < AMOUNT_FOLOWING_FILM_CARDS)
        .forEach((elem, index) => {
          let filmCard = new FilmCard(commentedCards[index]);
          render(commentedContainer, filmCard, RenderPosition.BEFOREEND);
          filmCard.addClickHandler();
        });

    ratedCards
        .sort((a, b) => a.rating > b.rating ? -1 : 1)
        .filter((elem, index) => index < AMOUNT_FOLOWING_FILM_CARDS)
        .forEach((elem, index) => {
          let filmCard = new FilmCard(ratedCards[index]);
          render(ratedContainer, filmCard, RenderPosition.BEFOREEND);
          filmCard.addClickHandler();
        });
  }
}
