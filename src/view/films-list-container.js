import AbstractClass from "./abstract";

const createFilmsListContainerHTML = () =>
  `<div class="films-list__container">
    </div>`;

export default class FilmsListContainer extends AbstractClass {

  getTemplate() {
    return createFilmsListContainerHTML();
  }

}
