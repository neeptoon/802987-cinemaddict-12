import {main} from "../main.js";
import {render, RenderPosition} from "../utils/render.js";
import GenreField from "../view/genre-field.js";
import FilmDetails from "../view/film-details.js";
import FilmCard from "../view/film-card.js";

export default class MovieCard {
  constructor(movieContainer) {

    this._movieContainer = movieContainer;
    this._movieComponent = null;
    this._popup = null;
    this._documentClickHandler = this._documentClickHandler.bind(this);
    this._documentKeyDownHandler = this._documentKeyDownHandler.bind(this);
  }

  init(movie) {
    this._movie = movie;

    this._movieComponent = new FilmCard(this._movie);
    this._renderCard();
    this._addClickHandler();
  }

  _addClickHandler() {
    const element = this._movieComponent.getElement();
    element.addEventListener(`click`, this._cardFilmClickHandler(this._movie));
  }

  _renderCard() {
    render(this._movieContainer, this._movieComponent, RenderPosition.BEFOREEND);
  }

  _fillPopupWithData(card) {
    this._popup = main.querySelector(`.film-details`);
    card.comments.forEach((elem) => render(this._popup.querySelector(`.film-details__comments-list`), new Comment(elem), RenderPosition.BEFOREEND));
    const [...rowsForProperties] = this._popup.querySelectorAll(`.film-details__row`);
    const rowForGenres = rowsForProperties[rowsForProperties.length - 1];
    card.genre.genres.forEach((elem) => render(rowForGenres.querySelector(`.film-details__cell`), new GenreField(elem).getElement(), RenderPosition.BEFOREEND));
  }

  _documentKeyDownHandler(evt) {
    const ESC_KEYCODE = 27;
    if (evt.keyCode === ESC_KEYCODE) {
      this._closePopup();
    }
  }

  _openPopup(card) {
    render(main, new FilmDetails(card).getElement(), RenderPosition.BEFOREEND);
    this._fillPopupWithData(card);
    document.addEventListener(`keydown`, this._documentKeyDownHandler);
    document.addEventListener(`click`, this._documentClickHandler);
  }

  _documentClickHandler(evt) {
    const closePopupButton = this._popup.querySelector(`.film-details__close-btn`);
    if (evt.target === closePopupButton) {
      this._closePopup();
    }
  }

  _closePopup() {
    if (this._popup) {
      this._popup.remove();
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

