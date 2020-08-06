import { createProfileHTML } from "./view/profile.js";
import { createMainNavigationHTML } from "./view/main-navigation.js";
import { createSortHTML } from "./view/sort.js";
import { createFilmsHTML } from "./view/films.js";
import { createFilmsListHTML } from "./view/films-list.js";
import { createShowMoreButtonHTML } from "./view/button.js";
import { createFilmsListExtraHTML } from "./view/films-list-extra.js";
import { createFilmsListContainerHTML } from "./view/films-list-container.js";
import { createFilmCardHTML } from "./view/film-card.js";
import { createfooterStatisticsHTML } from "./view/statistics.js";
import { mockFilmsList } from "./mock/films.js";

console.log(mockFilmsList);


const AMOUNT_FILMS_LIST_EXTRA = 2;

const header = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
const footerStatistics = footer.querySelector(`.footer__statistics`);

const filmsListExtraHeaders = [`<h2 class="films-list__title">Top rated</h2>`, `<h2 class="films-list__title">Most commented</h2>`];
const filmsCardAmounts = [5, 2, 2];


const renderComponent = (elem, where, html) => {
  elem.insertAdjacentHTML(where, html);
};

renderComponent(header, `beforeend`, createProfileHTML());
renderComponent(main, `afterbegin`, createMainNavigationHTML());
renderComponent(main, `beforeend`, createSortHTML());
renderComponent(main, `beforeend`, createFilmsHTML());

const films = main.querySelector(`.films`);

renderComponent(films, `afterbegin`, createFilmsListHTML());

const filmsList = films.querySelector(`.films-list`);

renderComponent(filmsList, `beforeend`, createFilmsListContainerHTML());
renderComponent(filmsList, `beforeend`, createShowMoreButtonHTML());

for (let i = 0; i < AMOUNT_FILMS_LIST_EXTRA; i++) {
  renderComponent(films, `beforeend`, createFilmsListExtraHTML());
}

const [...filmsListExtra] = films.querySelectorAll(`.films-list--extra`);

filmsListExtra.forEach((elem, index) => {
  renderComponent(elem, `beforeend`, createFilmsListContainerHTML());
  renderComponent(elem, `afterbegin`, filmsListExtraHeaders[index]);
});

const [...filmsListContainer] = films.querySelectorAll(`.films-list__container`);

filmsListContainer.forEach((elem, index) => {
  for (let i = 0; i < filmsCardAmounts[index]; i++) {
    renderComponent(elem, `afterbegin`, createFilmCardHTML());
  }
});

renderComponent(footerStatistics, `afterbegin`, createfooterStatisticsHTML());
