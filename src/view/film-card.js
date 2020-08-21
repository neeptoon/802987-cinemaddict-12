import {cardFilmClickHandler} from "../main.js";
import AbstractClass from "./abstract.js";

const createFilmCardHTML = (film) => {
  const MAX_STRING_LENGTH = 140;

  const {name, image, description, rating, publishYear, genre, duration, comments} = film;
  const truncation = (str, maxlength) => {
    return (str.length > maxlength) ? str.slice(0, maxlength - 1) + `…` : str;
  };

  return `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${publishYear}</span>
            <span class="film-card__duration">${duration}</span>
            <span class="film-card__genre">${genre.genres.join(`, `)}</span>
          </p>
          <img src="${image}" alt="" class="film-card__poster">
          <p class="film-card__description">${truncation(description, MAX_STRING_LENGTH)}</p>
          <a class="film-card__comments">${comments.length}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
          </form>
        </article>`;
};

export default class FilmCard extends AbstractClass {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmCardHTML(this._film);
  }

  addHandler(index, location) {
    this._element.addEventListener(`click`, cardFilmClickHandler(this._film, index, location));
  }
}

