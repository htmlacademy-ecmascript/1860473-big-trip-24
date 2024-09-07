import ItemListView from '../view/item-list-view.js';
import SortView from '../view/sort-view.js';
import PointForm from '../view/point-form.js';
import ListView from '../view/list-view.js';
import {RenderPosition, render} from '../render.js';


export default class BoardPresenter {

  listViewComponent = new ListView();

  constructor({boardContainer,pointsModel,offersModel,destinationsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.boardPoint = [...this.pointsModel.GetPoints()];

    render(this.listViewComponent, this.boardContainer);
    render(new SortView(), this.boardContainer, RenderPosition.AFTERBEGIN);
    render(new PointForm({point: this.boardPoint[0],
      allOffers: this.offersModel.getOfferByType(this.boardPoint[0].type),
      offers: [...this.offersModel.getOfferById(this.boardPoint[0].type,this.boardPoint[0].offers)],
      destinations: this.destinationsModel.getDestinationById(this.boardPoint[0].destination)}), this.listViewComponent.getElement());
    for (let i = 0; i < this.boardPoint.length; i++) {
      render(new ItemListView({point: this.boardPoint[i],
        offers: [...this.offersModel.getOfferById(this.boardPoint[i].type,this.boardPoint[i].offers)],
        destinations: this.destinationsModel.getDestinationById(this.boardPoint[i].destination)}), this.listViewComponent.getElement());
    }
  }
}
