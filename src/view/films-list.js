import AbstractClass from "./abstract.js";

const createFilmsListHTML = () =>
  `<section class="films-list">

    </section >`;

export default class FilmsList extends AbstractClass {

  getTemplate() {
    return createFilmsListHTML();
  }

}
