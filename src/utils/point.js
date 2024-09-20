import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

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

function isPointExpiringToday(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function isPointExpired(dueDate) {
  return dueDate && dayjs().isAfter(dueDate, 'D');
}

function isPointFuture(dueDate) {
  return dueDate && dayjs().isBefore(dueDate, 'D');
}

function updateItem(items, update){
  return items.map((item) => item.id === update.id ? update : item);
}

export {getRandomItem, timeDate, timeDiff, isPointExpiringToday, isPointExpired, isPointFuture, updateItem};
