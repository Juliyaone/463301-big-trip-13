import dayjs from "dayjs";
import {getRandomInteger} from "../util.js";
import {TYPES, DESTINATIONS, DESCRIPTIONS, OFFERS} from "../const.js";

// генерация mock type
const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

// генерация mock destination
const generateDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex];
};

// генерация mock descriptions
const generateDescriptions = () => {
  const newArrayDescriptions = DESCRIPTIONS.slice();
  const descriptionItems = [];
  for (let i = 0; i < newArrayDescriptions.length; i++) {

    if (descriptionItems.length <= 5) {
      const random = Math.floor(Math.random() * newArrayDescriptions.length);
      descriptionItems.push(newArrayDescriptions[random]);
    }
  }

  const mySet = new Set(descriptionItems);
  const аrrayDescription = Array.from(mySet);

  const description = аrrayDescription.join(` `);
  return description;
};

// генерация mock date
const generateDate = () => {
  const hourGap = getRandomInteger(0, 48);
  const minutesGap = getRandomInteger(0, 60);
  const startDate = dayjs().add(getRandomInteger(0, minutesGap), `minute`).add(getRandomInteger(-hourGap, 0), `hour`).valueOf();
  const endDate = dayjs().add(getRandomInteger(0, minutesGap), `minute`).add(getRandomInteger(0, hourGap), `hour`).valueOf();

  return {
    startDate,
    endDate,
  };
};

// генерация массива предложений
const generateOffers = () => {
  const newArray = OFFERS.slice();

  const newArrayOffers = [];

  for (let i = 0; i <= newArray.length; i++) {
    if (newArrayOffers.length <= newArray.length) {
      const random = Math.floor(Math.random() * newArray.length);
      newArrayOffers.push(newArray[random]);
    }
  }

  const mySet = new Set(newArrayOffers);
  const аrrayOffers = Array.from(mySet);

  const randomLength = getRandomInteger(0, 5);
  return аrrayOffers.slice(0, randomLength);
};

// генерация цены
const generatePrices = () => {
  const PRICE_COUNT = 1000;
  const GAP_PRICE = 10;
  let price = getRandomInteger(0, PRICE_COUNT);
  return Math.round(price / GAP_PRICE) * GAP_PRICE;
};

// генерация mock photo
const generatePhoto = () => {
  const randomIndex = getRandomInteger(1, 5);
  const newArray = [1, 2, 3, 4, 5];

  let photo = [];
  for (let i = 0; i < randomIndex; i++) {
    const random = Math.floor(Math.random() * newArray.length);
    photo.push(newArray[random]);
  }
  return photo;
};

// генерация объекта на основе mock
export const generatePoint = () => {
  const type = generateType();
  const destination = generateDestination();
  const offer = generateOffers();
  const price = generatePrices();
  const description = generateDescriptions();
  const photo = generatePhoto();
  const dateTime = {
    start: generateDate().startDate,
    end: generateDate().endDate,
  };

  const favorite = Boolean(getRandomInteger(0, 1));

  return {
    type,
    destination,
    description,
    offer,
    price,
    dateTime,
    photo,
    favorite
  };
};
