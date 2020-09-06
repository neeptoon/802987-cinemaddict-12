import AbstractClass from "./abstract.js";

const createFilmsHTML = () =>
  `<section class="films"></section>`;

export default class Films extends AbstractClass {

  getTemplate() {
    return createFilmsHTML();
  }

}
