import dayjs from "dayjs";
import {DESTINATIONS} from "./const.js";


const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


// Находит разницу во времени
const getDatesDuration = (start, end) => {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const durationHour = endDate.diff(startDate, `hour`);
  const durationMinutes = endDate.diff(startDate, `m`);
  const durationDay = endDate.diff(startDate, `day`);

  const addNull = (val)=> {
    let stringVal = `${val}`;
    if (val < 10) {
      stringVal = `0${val}`;
    }

    return stringVal;
  };

  let durationString = `${addNull(durationMinutes % 60)}M`;
  if (durationMinutes > 59 && durationHour < 24) {
    durationString = `${addNull(durationHour)}H ${addNull(durationMinutes % 60)}M`;
  } else if (durationHour > 24) {
    durationString = `${addNull(durationDay)}D ${addNull(durationHour % 24)}H ${addNull(durationMinutes % 60)}M`;
  }

  return durationString;
};

// Трансформирует дату
const transformationDate = (start, end) => {
  return {
    date: dayjs(start).format(`MMM D`),
    dateTimeStart: dayjs(start).format(`D/M/YY HH:mm`),
    dateTimeEnd: dayjs(end).format(`D/M/YY HH:mm`)
  };
};

// Создает список точек маршрута
const createDestinationList = () => {
  let destinationList = ``;
  for (let i = 0; i < DESTINATIONS.length; i++) {
    destinationList += `<option value="${DESTINATIONS[i]}"></option>`;
  }
  return destinationList;
};

export {
  getRandomInteger,
  getDatesDuration,
  transformationDate,
  createDestinationList
};
