import AbstractClass from "./abstract.js";

const createFilmsHTML = () =>
  `<section class="films"></section>`;

export default class ShowMoreButton extends AbstractClass {

  getTemplate() {
    return createFilmsHTML();
  }

}
