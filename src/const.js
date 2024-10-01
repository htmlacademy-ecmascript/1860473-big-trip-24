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

export {eventType, destinationList, filterType, sortType};
