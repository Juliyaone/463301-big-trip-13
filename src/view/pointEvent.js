import {getDatesDuration, transformationDate} from "../util.js";


export const createPointTemplate = (point) => {
  const {type, destination, offer, price, dateTime, favorite} = point;
  const {start, end} = dateTime;
  const {date, dateTimeStart, dateTimeEnd} = transformationDate();

  // Создает список дополнительных опций
  const createOffersList = () => {
    let offersList = ``;

    for (let i = 0; i < offer.length; i++) {
      const {text, cost} = offer[i];

      offersList += `<li class="event__offer">
                        <span class="event__offer-title">${text}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${cost}</span>
                     </li>`;
    }
    return offersList;
  };


  const favoriteClassName = favorite
    ? `event__favorite-btn`
    : `event__favorite-btn event__favorite-btn--active`;


  return `<li class="trip-events__item">
            <div class="event">
                <time class="event__date" datetime="${date}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${dateTimeStart}">${dateTimeStart}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${dateTimeEnd}">${dateTimeEnd}</time>
                  </p>
                  <p class="event__duration">${getDatesDuration(start, end)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                  <ul class="event__selected-offers">
                    ${createOffersList()}
                  </ul>
                  <button class="${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
          </li>`;
};
