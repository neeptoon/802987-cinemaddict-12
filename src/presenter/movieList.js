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
import {main} from "../main.js";
export default class MovieList {
  constructor(container) {
    this._container = container;

    this._films = new Films();
    this._filmsList = new FilmsList();
    this._filmsListExtra = new FilmsListExtra();
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
  }

  _renderDataRecievedHeading() {
    const films = main.querySelector(`.films`);
    const filmsList = films.querySelector(`.films-list`);

    if (mockFilmsList && mockFilmsList.length > 0) {
      render(filmsList, new DataReceivedHeading(), RenderPosition.AFTERBEGIN);

      for (let i = 0; i < AMOUNT_FILMS_LIST_EXTRA; i++) {
        render(films, new FilmsListExtra(i), RenderPosition.BEFOREEND);
      }

      const [...filmsListExtra] = films.querySelectorAll(`.films-list--extra`);

      filmsListExtra.forEach((elem) => {
        render(elem, new FilmsListContainer(), RenderPosition.BEFOREEND);
      });

    } else {
      render(filmsList, new NoDataHeading(), RenderPosition.AFTERBEGIN);
    }
  }
}
