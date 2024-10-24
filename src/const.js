const EventType = ['taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY : 'day',
  EVENT : 'event',
  TIME : 'time',
  PRICE : 'price',
  OFFERS : 'offers'
};

const NewPOINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  FAILED: 'FAILED',
};

const LoadType = {
  LOADING: 'LOADING',
  FAILED: 'FAILED',
};


const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;
const DEFAULT_SORTING_TYPE = SortType.DAY;

export {EventType, FilterType, SortType, UserAction, UpdateType, NewPOINT, DEFAULT_FILTER_TYPE, DEFAULT_SORTING_TYPE, LoadType };
