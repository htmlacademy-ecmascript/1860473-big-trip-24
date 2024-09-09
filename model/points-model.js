import {getRandomPoint} from '../mock/point.js';

const PointCount = 4;

export default class PointsModel {

  points = Array.from({length : PointCount}, getRandomPoint);

  GetPoints(){
    return this.points;
  }
}
