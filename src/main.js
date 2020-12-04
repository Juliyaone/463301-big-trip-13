import {createTripTemplate} from "./view/trip.js";
import {createCostTemplate} from "./view/cost.js";
import {createControlsTemplate} from "./view/controls.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/list.js";
import {createPointTemplate} from "./view/pointEvent.js"; // точка маршрута
import {createAddNewPointTemplate} from "./view/addNewPoint.js"; // новая точка маршрута
import {createEditPointTemplate} from "./view/editPoint.js"; // редактируемая точка маршрута\
import {generatePoint} from "./mock/point.js"; // подключаем моки




const TASK_COUNT = 15;

const points = new Array(TASK_COUNT).fill().map(generatePoint);

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


// добавляем в список элементы списка 15 раз

const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);
for (let i = 0; i < TASK_COUNT; i++) {
  render(siteTripEventsListElement, createPointTemplate(points[i]), `beforeend`);
}


// по клику на кнопу "New event" добавляем форму создания новой точки маршрута

const btnAddNewEvent = siteTripElement.querySelector(`.trip-main__event-add-btn`);

const btnAddNewEventClickHandler = function() {
  render(siteTripEventsListElement, createAddNewPointTemplate(), `afterbegin`);
  btnAddNewEvent.setAttribute("disabled", "disabled");
};

btnAddNewEvent.addEventListener(`click`, btnAddNewEventClickHandler);


// по клику на кнопу "Стрелка вниз" внутри точки маршрута, добавляем форму редактирования точки маршрута

const siteTripEventsListItemElement = siteTripEventsListElement.querySelectorAll(`.trip-events__item`);

for (let j = 0; j < siteTripEventsListItemElement.length; j++) {
  const btnEditEvent = siteTripEventsListItemElement[j].querySelector(`.event__rollup-btn`);

  const btnEditEventClickHandler = function() {
    render(siteTripEventsListItemElement[j], createEditPointTemplate(), `beforeend`);
    btnEditEvent.removeEventListener("click", btnEditEventClickHandler);
  }

  btnEditEvent.addEventListener(`click`, btnEditEventClickHandler);
}


