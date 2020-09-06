import {getTargetsToClick} from "./getTargetsToClick.js";
import {closePopup, openPopup} from "../view/popup.js";

export const cardFilmClickHandler = (data, index, location) => (evt) => {
  const targets = getTargetsToClick(location);
  if (evt.target === targets.title[index] || evt.target === targets.poster[index] || evt.target === targets.comments[index]) {
    closePopup();
    openPopup(data);
  }
};
