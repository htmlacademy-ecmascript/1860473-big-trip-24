import {getRandomPoint} from '../mock/point.js';

const PointCount = 4;

export default class PointsModel {

  #points = Array.from({length : PointCount}, getRandomPoint);

  get points(){
    return this.#points;
  }
}