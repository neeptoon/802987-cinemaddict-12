import {main} from "../main.js";
import {render, RenderPosition} from "../utils/render.js";
import GenreField from "../view/genre-field.js";
import FilmDetails from "../view/film-details.js";
import FilmCard from "../view/film-card.js";
import Comment from "../view/comment.js";

export default class MovieCard {
  constructor(movieContainer) {

    this._movieContainer = movieContainer;
    this._movieComponent = null;
    this._popup = null;
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._documentKeyDownHandler = this._documentKeyDownHandler.bind(this);
    this._cardFilmClickHandler = this._cardFilmClickHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieComponent = this._movieComponent;

    this._movieComponent = new FilmCard(this._movie);

    if (prevMovieComponent === null) {
      render(this._movieContainer, this._movieComponent, RenderPosition.BEFOREEND);
      this._addClickHandler();
      return;
    }

    if (this._movieComponent.getElement().contains(prevMovieComponent.getElement())) {
      this._movieComponent.replaceWith(prevMovieComponent);
    }

    prevMovieComponent.removeElement();
  }

  _addClickHandler() {
    const element = this._movieComponent.getElement();
    element.addEventListener(`click`, this._cardFilmClickHandler(this._movie));
  }

  _fillPopupWithData(card) {
    card.comments.forEach((elem) => {
      const comments = new Comment(elem);
      const container = this._popup.getElement().querySelector(`.film-details__comments-list`);
      render(container, comments, RenderPosition.BEFOREEND);
    });

    const [...rowsForProperties] = this._popup.getElement().querySelectorAll(`.film-details__row`);
    const rowForGenres = rowsForProperties[rowsForProperties.length - 1];
    card.genre.genres.forEach((elem) => {
      const genreField = new GenreField(elem);
      render(rowForGenres.querySelector(`.film-details__cell`), genreField, RenderPosition.BEFOREEND);
    });
  }

  _documentKeyDownHandler(evt) {
    const ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      this._closePopup();
    }
  }

  _openPopup(card) {
    this._popup = new FilmDetails(card);
    render(main, this._popup, RenderPosition.BEFOREEND);
    this._fillPopupWithData(card);
    document.addEventListener(`keydown`, this._documentKeyDownHandler);
    document.addEventListener(`click`, this._documentClickHandler);
  }

  _documentClickHandler(evt) {
    const closePopupButton = this._popup.getElement().querySelector(`.film-details__close-btn`);
    if (evt.target === closePopupButton) {
      this._closePopup();
    }
  }

  _closePopup() {
    if (this._popup) {
      this._popup.removeElement();
    }
    document.removeEventListener(`keydown`, this._documentKeyDownHandler);
    document.removeEventListener(`click`, this._documentClickHandler);
  }

  _cardFilmClickHandler(data) {
    return (evt) => {
      if (evt.target.tagName === `IMG` || evt.target.tagName === `H3` || evt.target.tagName === `A`) {
        this._closePopup();
        this._openPopup(data);
      }
    };
  }
}


