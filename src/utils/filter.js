import { filterType } from '../const.js';
import {isPointExpiringToday, isPointExpired, isPointFuture} from '../utils/point.js';

const filter = {
  [filterType.EVERYTHING]: (points) => points.filter((points) => points),
  [filterType.FUTURE]: (points) => points.filter((points) => isPointFuture(points.dateFrom)),
  [filterType.PRESENT]: (points) => points.filter((points) => isPointExpiringToday(points.dateFrom)),
  [filterType.PAST]: (points) => points.filter((points) => isPointExpired(points.dateFrom))
};

export {filter};
