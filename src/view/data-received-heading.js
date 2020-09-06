import AbstractClass from "./abstract.js";

const createDataReceivedHeadingHTML = () =>
  `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;


export default class DataReceivedHeading extends AbstractClass {

  getTemplate() {
    return createDataReceivedHeadingHTML();
  }

}

