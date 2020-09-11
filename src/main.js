import Profile from "./view/profile.js";
import MainNavigation from "./view/main-navigation.js";

import {generateFilter} from "./view/filter.js";
import {mockFilmsList} from "./mock/mockFilms.js";
import {render, RenderPosition} from "./utils/render.js";
import MovieList from "./presenter/movieList.js";


const header = document.querySelector(`.header`);
export const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);
export const footerStatistics = footer.querySelector(`.footer__statistics`);
const preparatedMainFilmCardsForRender = mockFilmsList.slice();
const filters = generateFilter(preparatedMainFilmCardsForRender);
export const clearFooterStatistics = () => footerStatistics.firstElementChild.remove();

render(header, new Profile(), RenderPosition.BEFOREEND);
render(main, new MainNavigation(filters), RenderPosition.AFTERBEGIN);

const filmPresenter = new MovieList(main);
filmPresenter.init(mockFilmsList);
