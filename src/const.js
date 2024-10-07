const eventType = ['taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant'];
const destinationList = ['Nagasaki','Munich','Chamonix','Rome','Moscow','Den Haag','Oslo','Naples'];


const filterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const sortType = {
  DAY : 'day',
  EVENT : 'event',
  TIME : 'time',
  PRICE : 'price',
  OFFERS : 'offers'
};

const newPOINT = {
  id: '',
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const userAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const updateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


const DEFAULT_FILTER_TYPE = filterType.EVERYTHING;
const DEFAULT_SORTING_TYPE = sortType.DAY;

export {eventType, destinationList, filterType, sortType, userAction, updateType, newPOINT, DEFAULT_FILTER_TYPE, DEFAULT_SORTING_TYPE };
