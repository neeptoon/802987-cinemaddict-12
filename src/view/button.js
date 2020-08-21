import AbstractClass from "./abstract.js";

const createShowMoreButtonHTML = () =>
  `<button class="films-list__show-more">Show more</button>`;


export default class ShowMoreButton extends AbstractClass {

  getTemplate() {
    return createShowMoreButtonHTML();
  }
}
