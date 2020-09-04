import {main} from "../main.js";
import {render, RenderPosition} from "../utils/render.js";
import GenreField from "../view/genre-field.js";
import FilmDetails from "../view/film-details.js";

let popup = null;

const fillPopupWithData = (card) => {
  popup = main.querySelector(`.film-details`);
  card.comments.forEach((elem) => render(popup.querySelector(`.film-details__comments-list`), new Comment(elem), RenderPosition.BEFOREEND));
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

export const openPopup = function (card) {
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

export const closePopup = function () {
  if (popup) {
    popup.remove();
  }
  document.removeEventListener(`keydown`, documentKeyDownHandler);
  document.removeEventListener(`click`, documentClickHandler);
};
