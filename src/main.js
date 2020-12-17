import {createElement, renderElement, RenderPosition} from "./util.js";
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
const siteHeaderElement = document.querySelector(`.page-header`);
const siteTripElement = siteHeaderElement.querySelector(`.trip-main`);
renderElement(siteTripElement, new TripView().getElement(), RenderPosition.AFTERBEGIN);

// добавляем блок "Меню"
const siteTripControlsH2Element = siteTripElement.querySelector(`.trip-controls h2:first-child`);
renderElement(siteTripControlsH2Element, new ControlsView().getElement(), RenderPosition.AFTEREND);

// добавляем блок "Фильтры"
const siteTripControlsElement = siteTripElement.querySelector(`.trip-controls`);
renderElement(siteTripControlsElement, new FilterView().getElement(), RenderPosition.BEFOREEND);

// добавляем блок "Сортировка"
const siteMainElement = document.querySelector(`.page-main`);
const siteTripEventsElement = siteMainElement.querySelector(`.trip-events`);
renderElement(siteTripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);

// добавляем блок "Контент" - список точек маршрута
renderElement(siteTripEventsElement, new ListView().getElement(), RenderPosition.BEFOREEND);

const eventsListElement = siteTripEventsElement.querySelector(`.trip-events__list`);  // ul

// при клике на кнопу "New event" добавляем форму создания новой точки маршрута
const btnAddNewEvent = siteTripElement.querySelector(`.trip-main__event-add-btn`);

const btnAddNewEventClickHandler = function () {
  renderElement(eventsListElement, new AddNewPointView(points[0]).getElement(), RenderPosition.AFTERBEGIN);
  btnAddNewEvent.setAttribute(`disabled`, `disabled`);
};

btnAddNewEvent.addEventListener(`click`, btnAddNewEventClickHandler);



// при клике на кнопку "Стрелка вниз" добавляем форму редакт., при клике на кнопку "Стрелка вверх" добавляем карточку точки маршрута
const renderPoint = (eventsListElement, point) => {

  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replaceCardToForm = () => {
    eventsListElement.replaceChild(editPointComponent.getElement(), pointComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventsListElement.replaceChild(pointComponent.getElement(), editPointComponent.getElement());
  };

  pointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  editPointComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceFormToCard();
  });

  renderElement(eventsListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

// добавляем в список элементы списка 15 раз
const pointsArrayCopy = points.slice(0, POINT_COUNT);

for (let i = 0; i <= pointsArrayCopy.length; i++) {
  renderPoint(eventsListElement, pointsArrayCopy[i]);
};
