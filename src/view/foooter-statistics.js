import AbstractClass from "./abstract";


const createFooterStatisticsHTML = (amount) =>
  `<p>${amount >= 0 ? amount : 0} movies inside</p>`;


export default class FilmCard extends AbstractClass {
  constructor(amount) {
    super();
    this._element = null;
    this._amount = amount;
  }

  getTemplate() {
    return createFooterStatisticsHTML(this._amount);
  }

}
