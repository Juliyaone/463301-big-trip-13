import {renderTemplate} from "./util.js"; // подключаем моки
import {createTripTemplate} from "./view/trip.js";
import {createControlsTemplate} from "./view/controls.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createListTemplate} from "./view/list.js";
import {createPointTemplate} from "./view/pointEvent.js"; // точка маршрута
import {createAddNewPointTemplate} from "./view/addNewPoint.js"; // новая точка маршрута
import {createEditPointTemplate} from "./view/editPoint.js"; // редактируемая точка маршрута
import {generatePoint} from "./mock/point.js"; // подключаем моки

const TASK_COUNT = 15;

const points = new Array(TASK_COUNT).fill().map(generatePoint);


// добавляем блок "Маршрут и стоимость"
const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripElement = siteHeaderElement.querySelector(`.trip-main`);
renderTemplate(siteTripElement, createTripTemplate(), `afterbegin`);


// добавляем блок "Меню"
const siteTripControlsElement = siteTripElement.querySelector(`.trip-controls`);
renderTemplate(siteTripControlsElement, createFilterTemplate(), `beforeend`);


// добавляем блок "Фильтры"
const siteTripControlsH2Element = siteTripElement.querySelector(`.trip-controls h2:first-child`);
renderTemplate(siteTripControlsH2Element, createControlsTemplate(), `afterend`);


// добавляем блок "Сортировка"
const siteMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
renderTemplate(siteTripEventsElement, createSortTemplate(), `beforeend`);


// добавляем блок "Контент" - список точек маршрута
renderTemplate(siteTripEventsElement, createListTemplate(), `beforeend`);


// добавляем в список элементы списка 15 раз
const siteTripEventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);
for (let i = 0; i < TASK_COUNT; i++) {
  renderTemplate(siteTripEventsListElement, createPointTemplate(points[i]), `beforeend`);
}


// по клику на кнопу "Стрелка вниз" внутри точки маршрута, добавляем форму редактирования точки маршрута
const siteTripEventsItemElement = siteTripEventsListElement.querySelectorAll(`.trip-events__item`);

for (let j = 0; j < siteTripEventsItemElement.length; j++) {
  const btnEditEvent = siteTripEventsItemElement[j].querySelector(`.event__rollup-btn`);

  const btnEditEventClickHandler = function () {
    renderTemplate(siteTripEventsItemElement[j], createEditPointTemplate(points[j]), `beforeend`);
    btnEditEvent.removeEventListener(`click`, btnEditEventClickHandler);
  };

  btnEditEvent.addEventListener(`click`, btnEditEventClickHandler);
}


// по клику на кнопу "New event" добавляем форму создания новой точки маршрута
const btnAddNewEvent = siteTripElement.querySelector(`.trip-main__event-add-btn`);

const btnAddNewEventClickHandler = function () {
  renderTemplate(siteTripEventsListElement, createAddNewPointTemplate(points[0]), `afterbegin`);
  btnAddNewEvent.setAttribute(`disabled`, `disabled`);
};

btnAddNewEvent.addEventListener(`click`, btnAddNewEventClickHandler);
