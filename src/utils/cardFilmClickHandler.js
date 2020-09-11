import {closePopup, openPopup} from "../view/popup.js";

export const cardFilmClickHandler = (data) => (evt) => {
  if (evt.target.tagName === `IMG` || evt.target.tagName === `H3` || evt.target.tagName === `A`) {
    closePopup();
    openPopup(data);
  }
};
