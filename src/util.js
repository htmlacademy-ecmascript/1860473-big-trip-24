import dayjs from 'dayjs';

function getRandomItem(items){
  return items[Math.floor(Math.random() * items.length)];
}

function timeDate(time, DATE_FORMAT){
  return time ? dayjs(time).format(DATE_FORMAT) : '';
}

function timeDiff(time1, time2){
  const date1 = dayjs(time1);
  const date2 = dayjs(time2);

  return date2.diff(date1, 'm');
}

export {getRandomItem, timeDate, timeDiff};
