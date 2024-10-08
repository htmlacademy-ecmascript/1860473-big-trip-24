const EventType = ['taxi','bus','train','ship','drive','flight','check-in','sightseeing','restaurant'];
const DestinationList = ['Nagasaki','Munich','Chamonix','Rome','Moscow','Den Haag','Oslo','Naples'];


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
  id: '',
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
};


const DEFAULT_FILTER_TYPE = FilterType.EVERYTHING;
const DEFAULT_SORTING_TYPE = SortType.DAY;

export {EventType, DestinationList, FilterType, SortType, UserAction, UpdateType, NewPOINT, DEFAULT_FILTER_TYPE, DEFAULT_SORTING_TYPE };
