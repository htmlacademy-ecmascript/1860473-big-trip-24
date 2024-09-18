import { filterType } from '../const.js';
import {isPointExpiringToday, isPointExpired, isPointFuture} from '../utils/point.js';

const filter = {
  [filterType.EVERYTHING]: (points) => points.filter((point) => point),
  [filterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [filterType.PRESENT]: (points) => points.filter((point) => isPointExpiringToday(point.dateFrom)),
  [filterType.PAST]: (points) => points.filter((point) => isPointExpired(point.dateFrom))
};

export {filter};
