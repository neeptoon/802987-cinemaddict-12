import AbstractClass from "./abstract";

const createNoDataHeadingHTML = () =>
  `<h2 class="films-list__title">There are no movies in our database</h2>`;

export default class NoDataHeading extends AbstractClass {

  getTemplate() {
    return createNoDataHeadingHTML();
  }

}
