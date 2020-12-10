import {createDestinationList} from "../util.js";
import {TYPES, OFFERS} from "../const.js";


export const createAddNewPointTemplate = (point) => {
  const {destination, description, photo} = point;

  // Создает список типов
  const createListType = () => {
    let typeList = ``;
    const types = TYPES;
    for (let i = 0; i < types.length; i++) {
      typeList += `<div class="event__type-item">
                      <input id="event-type-${types[i].toLowerCase()}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${types[i]}">
                      <label class="event__type-label  event__type-label--${types[i].toLowerCase()}" for="event-type-${types[i].toLowerCase()}">${types[i]}</label>
                    </div>`;
    }
    return typeList;
  };

  // Создает список дополнительных опций
  const createOffersListEvent = () => {
    let offerDefault = OFFERS;
    let offersList = [];
    for (let i = 0; i < offerDefault.length; i++) {
      const {text, cost} = offerDefault[i];
      offersList += `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${[i]}" type="checkbox" name="${text}">
                        <label class="event__offer-label" for="event-offer-${[i]}">
                          <span class="event__offer-title">${text}</span>
                            &plus;&euro;&nbsp;
                          <span class="event__offer-price">${cost}</span>
                        </label>
                      </div>`;
    }
    return offersList;
  };


  // Создает список photo
  const createPhotoListEvent = () => {
    let photoList = [];
    const photos = photo;
    for (let i = 0; i < photos.length; i++) {
      photoList += `<img class="event__photo" src="img/photos/${photos[i]}.jpg" alt="Event photo">`;

    }
    return photoList;
  };


  return `<form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${createListType()}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      Flight
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createDestinationList()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                        ${createOffersListEvent()}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPhotoListEvent()}
                      </div>
                    </div>
                  </section>
                </section>
              </form>`;
};
