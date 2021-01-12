import {renderElement, RenderPosition, replace} from "./utils/render.js";
import {onEscKeyDown} from "./utils/task.js";

import {generatePoint} from "./mock/point.js"; // подключаем моки

import TripView from "./view/trip.js";
import ControlsView from "./view/controls.js";
import FilterView from "./view/filter.js";

import SortView from "./view/sort.js";
import ListView from "./view/list.js";

import PointView from "./view/pointEvent.js"; // точка маршрута
import AddNewPointView from "./view/addNewPoint.js"; // новая точка маршрута
import EditPointView from "./view/editPoint.js"; // редактируемая точка маршрута

const POINT_COUNT = 15;

const points = new Array(POINT_COUNT).fill().map(generatePoint);


// добавляем блок "Маршрут и стоимость"
const headerElement = document.querySelector(`.page-header`);
const tripElement = headerElement.querySelector(`.trip-main`);
renderElement(tripElement, new TripView(), RenderPosition.AFTERBEGIN);

// добавляем блок "Меню"
const tripControlsH2Element = tripElement.querySelector(`.trip-controls h2:first-child`);
renderElement(tripControlsH2Element, new ControlsView(), RenderPosition.AFTEREND);

// добавляем блок "Фильтры"
const tripControlsElement = tripElement.querySelector(`.trip-controls`);
renderElement(tripControlsElement, new FilterView(), RenderPosition.BEFOREEND);

// добавляем блок "Сортировка"
const mainElement = document.querySelector(`.page-main`);
const containerEventsElement = mainElement.querySelector(`.trip-events`);
renderElement(containerEventsElement, new SortView(), RenderPosition.BEFOREEND);

// добавляем блок "Контент" - список точек маршрута
renderElement(containerEventsElement, new ListView(), RenderPosition.BEFOREEND);

const eventsListElement = containerEventsElement.querySelector(`.trip-events__list`);

// при клике на кнопу "New event" добавляем форму создания новой точки маршрута
const btnAddNewEvent = tripElement.querySelector(`.trip-main__event-add-btn`);

const renderNewPoint = () => {
  const newPointComponent = new AddNewPointView(points[0]);
  renderElement(eventsListElement, newPointComponent, RenderPosition.AFTERBEGIN);
  btnAddNewEvent.setAttribute(`disabled`, `disabled`);

  newPointComponent.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
  });

  newPointComponent.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
    removeAddNewPoint();
  });

};

const addNewPointHendler = () => {
  renderNewPoint();
};

const removeAddNewPoint = () => {
  const eventEdit = eventsListElement.querySelector(`.event--edit`);
  eventEdit.remove();
  btnAddNewEvent.removeAttribute(`disabled`);
};

const newPointEscPressHandler = function (evt) {
  onEscKeyDown(evt, removeAddNewPoint);
};


btnAddNewEvent.addEventListener(`click`, addNewPointHendler);
document.addEventListener(`keydown`, newPointEscPressHandler);


// при клике на кнопку "Стрелка вниз" добавляем форму редакт., при клике на кнопку "Стрелка вверх" добавляем карточку точки маршрута
const renderPoint = (eventsList, point) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replaceCardToForm = () => {
    replace(editPointComponent, pointComponent);
  };

  const replaceFormToCard = () => {
    replace(pointComponent, editPointComponent);
  };

  const editPointEscPressHandler = function (evt) {
    onEscKeyDown(evt, replaceFormToCard);
  };

  pointComponent.setPointClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, editPointEscPressHandler);
  });

  editPointComponent.setEditClickHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, editPointEscPressHandler);
  });

  editPointComponent.setSaveClickHandler();

  renderElement(eventsList, pointComponent, RenderPosition.BEFOREEND);
};

// добавляем в список элементы списка 15 раз
const pointsArrayCopy = points.slice(0, POINT_COUNT);

for (let i = 0; i <= pointsArrayCopy.length; i++) {
  renderPoint(eventsListElement, pointsArrayCopy[i]);
}
