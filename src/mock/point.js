import dayjs from "dayjs";

// Унниверсальная функция генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

//генерация mock type
const generateType = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
}


//генерация mock destination
const generateDestination = () => {
  const destinations = [
    `Amsterdam`,
    `Chamonix`,
    `Geneva`
  ];

  const randomIndex = getRandomInteger(0, destinations.length - 1);
  return destinations[randomIndex];
}


//генерация mock descriptions
const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const generateDescriptions = (items) => {
  const newArrayDescriptions = descriptions.slice();
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

// генерация mock dateStart
const generateDateStart = () => {
  const dateTimeFormat = `2020-12-21T16:00`;
  const maxDaysGap = 7;
  const dateStart = dayjs(dateTimeFormat).add(getRandomInteger(-maxDaysGap, maxDaysGap), `day`).toDate();
  return dateStart;
};

// генерация mock dateEnd
const generateDateEnd = () => {
  const dateTimeFormat = `2020-12-21T17:00`;
  const maxDaysGap = 7;
  const dateEnd = dayjs(dateTimeFormat).add(getRandomInteger(1, maxDaysGap), `day`).toDate();
  return dateEnd;
};


// генерация массива предложений
const offers = [
    {
      text: `Order Uber`,
      price: `20`
    },
    {
      text: `Add luggage`,
      price: `50`
    },
    {
      text: `Switch to comfort`,
      price: `80`
    },
    {
      text:  `Rent a car`,
      price: `200`
    },
    {
      text: `Add breakfast`,
      price: `40`
    },
    {
      text: `Book tickets`,
      price: `30`
    },
    {
      text: `Lunch in city`,
      price: `50`
    }
];

const generateOffers = () => {
  const newArray = offers.slice();

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
  return аrrayOffers.slice(0,  randomLength);
};


//генерация цены
const generatePrices = () => {
  const PRICE_COUNT = 1000;
  const GAP_PRICE = 10;
  let price = getRandomInteger(0, PRICE_COUNT);
  return Math.round(price / GAP_PRICE) * GAP_PRICE;
}




//генерация mock photo
const generatePhoto = () => {
  const randomIndex = getRandomInteger(1, 5);
  let photo = [];
  for (let i = 0; i < randomIndex; i++) {
    photo.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photo;
};



//генерация объекта на основе mock
export const generatePoint = () => {
  const dateStart = generateDateStart();
  const dateEnd = generateDateEnd();
  const type = generateType();
  const destination = generateDestination();
  const offer =  generateOffers();
  const price = generatePrices();
  const description = generateDescriptions();
  const photo = generatePhoto();

  return {
    type,
    destination,
    description,
    offer,
    price,
    dateStart,
    dateEnd,
    photo,
    favorite: Boolean(getRandomInteger(0, 1))
  };

  // photo: Math.random();

};
