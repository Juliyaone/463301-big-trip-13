import {render, RenderPosition} from "./util.js";
import TripView from "./view/trip.js";
import SortView from "./view/sort.js";
import ControlsView from "./view/controls.js";
import FilterView from "./view/filter.js";
import ListView from "./view/list.js";
import PointView from "./view/pointEvent.js"; // точка маршрута
import AddNewPointView from "./view/addNewPoint.js"; // новая точка маршрута
import EditPointView from "./view/editPoint.js"; // редактируемая точка маршрута
import {generatePoint} from "./mock/point.js"; // подключаем моки

const POINT_COUNT = 15;

const points = new Array(POINT_COUNT).fill().map(generatePoint);


// добавляем блок "Маршрут и стоимость"
const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripElement = siteHeaderElement.querySelector(`.trip-main`);
render(siteTripElement, new TripView().getElement(), RenderPosition.AFTERBEGIN);

// добавляем блок "Меню"
const siteTripControlsH2Element = siteTripElement.querySelector(`.trip-controls h2:first-child`);
render(siteTripControlsH2Element, new ControlsView().getElement(), RenderPosition.AFTEREND);

// добавляем блок "Фильтры"
const siteTripControlsElement = siteTripElement.querySelector(`.trip-controls`);
render(siteTripControlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

// добавляем блок "Сортировка"
const siteMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
render(siteTripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// добавляем блок "Контент" - список точек маршрута
render(siteTripEventsElement, new ListView().getElement(), RenderPosition.BEFOREEND);

// добавляем в список элементы списка 15 раз
const eventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);
for (let i = 0; i < POINT_COUNT; i++) {
  render(eventsListElement, new PointView(points[i]).getElement(), RenderPosition.BEFOREEND);
}


// по клику на кнопу "Стрелка вниз" внутри точки маршрута, добавляем форму редактирования точки маршрута и удаляем точку маршрута
const siteTripEventsItemElement = eventsListElement.querySelectorAll(`.trip-events__item`);

for (let j = 0; j < siteTripEventsItemElement.length; j++) {

  const btnEditEvent = siteTripEventsItemElement[j].querySelector(`.event__rollup-btn`);
  const point = siteTripEventsItemElement[j].querySelector(`.event`);

  const btnEditEventClickHandler = function () {
    siteTripEventsItemElement[j].replaceChild(new EditPointView(points[j]).getElement(), point);
    btnEditEvent.removeEventListener(`click`, btnEditEventClickHandler);
  };

  if (!point.classList.contains(`event--edit`)) {
    btnEditEvent.addEventListener(`click`, btnEditEventClickHandler);
  }
  // В обратном порядке пока недодумалась:(
  // const btnEventClickHandler = function () {
  //   siteTripEventsItemElement[j].replaceChild(new PointView(points[j]).getElement(), editPoint);
  //   btnPointEvent.removeEventListener(`click`, btnEventClickHandler);
  // };

  // if (point.classList.contains(`event--edit`)) {
  //   const editPoint = siteTripEventsItemElement[j].querySelector(`form`);
  //   const btnPointEvent = editPoint.querySelector(`.event__rollup-btn`);
  //   btnPointEvent.addEventListener(`click`, btnEventClickHandler);
  // }
}


// по клику на кнопу "New event" добавляем форму создания новой точки маршрута
const btnAddNewEvent = siteTripElement.querySelector(`.trip-main__event-add-btn`);

const btnAddNewEventClickHandler = function () {
  render(eventsListElement, new AddNewPointView(points[0]).getElement(), RenderPosition.AFTERBEGIN);
  btnAddNewEvent.setAttribute(`disabled`, `disabled`);
};

btnAddNewEvent.addEventListener(`click`, btnAddNewEventClickHandler);
