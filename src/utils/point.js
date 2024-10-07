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
    parts.push(`${minutes}`);
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

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortPointDate(pointA, pointB) {
  const weight = getWeightForNullDate(pointA.dateFrom, pointB.dateFrom);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function timeDiffMilliseconds(time1, time2){
  const date1 = dayjs(time1);
  const date2 = dayjs(time2);

  const diffMilliseconds = date2.diff(date1);

  return diffMilliseconds;
}

function sortPointTime(pointA, pointB) {
  return timeDiffMilliseconds(pointA.dateFrom,pointA.dateTo) - timeDiffMilliseconds(pointB.dateFrom,pointB.dateTo);
}

function sortPointPrice(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice;
}

function sortPointEvent(pointA, pointB) {
  if (pointA.type > pointB.type) {
    return 1;
  }
  if (pointA.type < pointB.type) {
    return -1;
  }
  return 0;
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

export {getRandomItem, timeDate, timeDiff, isPointExpiringToday, isPointExpired, isPointFuture, updateItem, sortPointDate, sortPointTime, sortPointPrice, sortPointEvent, isDatesEqual};
