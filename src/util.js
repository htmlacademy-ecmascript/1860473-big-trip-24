import dayjs from 'dayjs';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

function getRandomItem(items){
  return items[Math.floor(Math.random() * items.length)];
}

function timeDate(time, DATE_FORMAT){
  return time ? dayjs(time).format(DATE_FORMAT) : '';
}

function timeDiff(time1, time2){
  const date1 = dayjs(time1);
  const date2 = dayjs(time2);

  const diffMilliseconds = date2.diff(date1);

  const diffDuration = dayjs.duration(diffMilliseconds);
  const days = Math.floor(diffDuration.asDays());
  const hours = diffDuration.hours();
  const minutes = diffDuration.minutes();

  const parts = [];
  if (days > 0) {
    parts.push(`${days}D`);
  }
  if (hours > 0 || days > 0) {
    parts.push(`${hours}H`);
  }
  if (minutes > 0 || hours > 0 || days > 0) {
    parts.push(`${minutes}M`);
  }

  return parts.join(' ');
}

export {getRandomItem, timeDate, timeDiff};
