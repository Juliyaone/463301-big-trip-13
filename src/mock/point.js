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


//генерация mock offer
const generateOffer = () => {
  const offers = [
    [`Order Uber`, `20 €`],
    [`Add luggage`, `50 €`],
    [`Switch to comfort`, `80 €`],
    [`Rent a car`, `200 €`],
    [`Add breakfast`, `50 €`],
    [`Book tickets`, `40 €`],
    [`Lunch in city`, `30 €`]
  ];

  const randomIndex = getRandomInteger(0, offers.length - 1);
  return offers[randomIndex].join();
}


//генерация mock descriptions
const generateDescriptions = () => {
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

  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  return descriptions[randomIndex];
};

// генерация mock dateStart ДОРАБОТАТЬ
const generateDateStart = () => {
  const date = dayjs();
  const startDate = date.toDate();
  return startDate;
};

// генерация mock dateEnd ДОРАБОТАТЬ
const generateDateEnd = () => {
  const date = dayjs();
  const daysGap = 1;
  const startDate = dayjs();
  const dateEnd = startDate.add(daysGap, `day`).toDate();
  return dateEnd;
};




//генерация объекта на основе mock
export const generatePoint = () => {
  const dateTimeStart = generateDateStart();
  const dateTimeEnd = generateDateEnd();
  const type = generateType();
  const destination = generateDestination();
  const offer =  generateOffer();
  const description = generateDescriptions();

  return {
    type,
    destination,
    offer,
    description,
    dateTimeStart,
    dateTimeEnd,
    favorite: Boolean(getRandomInteger(0, 1))
  };

  // dateTimeEnd: ;
  // photo: Math.random();
  // price: 20€;
};
