import {createTripTemplate} from "./view/trip.js";
import {createCostTemplate} from "./view/cost.js";
import {createControlsTemplate} from "./view/controls.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/list.js";
import {createItemTemplate} from "./view/item.js";
import {createPointTemplate} from "./view/pointEvent.js"; // точка маршрута
import {createAddNewPointTemplate} from "./view/addNewPoint.js"; // новая точка маршрута
import {createEditFormTemplate} from "./view/editForm.js"; // редактируемая точка маршрута



const TASK_COUNT = 3;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// добавляем блок "Маршрут и стоимость"

const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripElement = siteHeaderElement.querySelector(`.trip-main`);
const siteTripControlsElement = siteTripElement.querySelector(`.trip-controls`);
render(siteTripControlsElement, createTripTemplate(), `beforebegin`);


// добавляем блоки "Меню" и "Фильтры"

const siteTripInfoElement = siteTripElement.querySelector(`.trip-info`);
render(siteTripInfoElement, createCostTemplate(), `beforeend`);
const siteHiddenElement = siteTripControlsElement.querySelector(`.visually-hidden`);
render(siteHiddenElement, createControlsTemplate(), `afterend`);
render(siteTripControlsElement, createFilterTemplate(), `beforeend`);


// добавляем блок "Сортировка"

const siteMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteTripEventsHiddenElement = siteTripEventsElement.querySelector(`.visually-hidden`);
render(siteTripEventsHiddenElement, createSortTemplate(), `afterend`);


// добавляем блок список точек маршрута

const siteTripSortElement = siteTripEventsElement.querySelector(`.trip-sort`);
render(siteTripSortElement, createListTemplate(), `afterend`);

// добавляем в список элементы списка 3 разa

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);
for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTripEventsListElement, createItemTemplate(), `beforeend`);
}

// добавляем в 1 элемент списка форму редактирования точки маршрута

const siteTripEventsItemOneElement = siteTripEventsListElement.querySelector(`.trip-events__item:first-child`);
render(siteTripEventsItemOneElement, createEditFormTemplate(), `beforeend`);


// добавляем 2 элементу списка форму создания точки маршрута

const siteTripEventsItemTwoElement = siteTripEventsListElement.querySelector(`.trip-events__item:nth-child(2)`);
render(siteTripEventsItemTwoElement, createAddNewPointTemplate(), `beforeend`);



