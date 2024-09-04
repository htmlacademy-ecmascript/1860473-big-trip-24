import ItemListView from '../view/item-list-view.js';
import SortView from '../view/sort-view.js';
import {render} from '../render.js';


export default class BoardPresenter {

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(new ItemListView(), this.boardContainer);
  }
}
