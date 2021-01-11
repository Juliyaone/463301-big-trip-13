import AbstractView from "./abstract.js";

const createControlsTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn" href="#">Table</a>
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Stats</a>
            </nav>`;
};

export default class Controls extends AbstractView {
  getTemplate() {
    return createControlsTemplate();
  }
}
