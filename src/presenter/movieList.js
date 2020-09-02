import Films from "../view/films.js";
import FilmsList from "../view/films-list.js";
import FilmsListExtra from "../view/films-list-extra.js";
import FilmsListContainer from "../view/films-list-container.js";
import ShowMoreButton from "../view/button.js";
import NoDataHeading from "../view/no-data-heading.js";
import DataReceivedHeading from "../view/data-received-heading.js";
import {render, RenderPosition} from "../utils/render.js";

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

  }
}
