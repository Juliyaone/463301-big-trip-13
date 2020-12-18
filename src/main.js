import {renderElement, RenderPosition, onEscKeyDown} from "./util.js";
import TripView from "./view/trip.js";
import ControlsView from "./view/controls.js";
import FilterView from "./view/filter.js";

import SortView from "./view/sort.js";
import ListView from "./view/list.js";

import PointView from "./view/pointEvent.js"; // точка маршрута
import AddNewPointView from "./view/addNewPoint.js"; // новая точка маршрута
import EditPointView from "./view/editPoint.js"; // редактируемая точка маршрута

import {generatePoint} from "./mock/point.js"; // подключаем моки

const POINT_COUNT = 15;

const points = new Array(POINT_COUNT).fill().map(generatePoint);


// добавляем блок "Маршрут и стоимость"
const headerElement = document.querySelector(`.page-header`);
const tripElement = headerElement.querySelector(`.trip-main`);
renderElement(tripElement, new TripView().getElement(), RenderPosition.AFTERBEGIN);

// добавляем блок "Меню"
const tripControlsH2Element = tripElement.querySelector(`.trip-controls h2:first-child`);
renderElement(tripControlsH2Element, new ControlsView().getElement(), RenderPosition.AFTEREND);

// добавляем блок "Фильтры"
const tripControlsElement = tripElement.querySelector(`.trip-controls`);
renderElement(tripControlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

// добавляем блок "Сортировка"
const mainElement = document.querySelector(`.page-main`);
const containerEventsElement = mainElement.querySelector(`.trip-events`);
renderElement(containerEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// добавляем блок "Контент" - список точек маршрута
renderElement(containerEventsElement, new ListView().getElement(), RenderPosition.BEFOREEND);

const eventsListElement = containerEventsElement.querySelector(`.trip-events__list`);

// при клике на кнопу "New event" добавляем форму создания новой точки маршрута
const btnAddNewEvent = tripElement.querySelector(`.trip-main__event-add-btn`);

const btnAddNewEventClickHandler = function () {
  const newTravelPoint = new AddNewPointView(points[0]);
  renderElement(eventsListElement, newTravelPoint.getElement(), RenderPosition.AFTERBEGIN);
  btnAddNewEvent.setAttribute(`disabled`, `disabled`);
};

const removeAddNewPoint = () => {
  const eventEdit = eventsListElement.querySelector(`.event--edit`);
  eventEdit.remove();
  btnAddNewEvent.removeAttribute(`disabled`);
};

const newPointEscPressHandler = function (evt) {
  onEscKeyDown(evt, removeAddNewPoint);
};

btnAddNewEvent.addEventListener(`click`, btnAddNewEventClickHandler);
document.addEventListener(`keydown`, newPointEscPressHandler);


// при клике на кнопку "Стрелка вниз" добавляем форму редакт., при клике на кнопку "Стрелка вверх" добавляем карточку точки маршрута
const renderPoint = (eventsList, point) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replaceCardToForm = () => {
    eventsList.replaceChild(editPointComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventsList.replaceChild(pointComponent.getElement(), editPointComponent.getElement());
  };

  const editPointEscPressHandler = function (evt) {
    onEscKeyDown(evt, replaceFormToCard);
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, editPointEscPressHandler);
  });

  editPointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, editPointEscPressHandler);
  });

  renderElement(eventsList, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

// добавляем в список элементы списка 15 раз
const pointsArrayCopy = points.slice(0, POINT_COUNT);

for (let i = 0; i <= pointsArrayCopy.length; i++) {
  renderPoint(eventsListElement, pointsArrayCopy[i]);
}
