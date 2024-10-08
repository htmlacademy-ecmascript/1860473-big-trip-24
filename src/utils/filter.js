import { FilterType } from '../const.js';
import {isPointExpiringToday, isPointExpired, isPointFuture} from '../utils/point.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointExpiringToday(point.dateFrom)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointExpired(point.dateFrom))
};

export {filter};
