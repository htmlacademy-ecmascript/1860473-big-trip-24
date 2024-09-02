import NewItemList from '../view/item-list.js';
import EditPoint from '../view/edit-point.js';
import AddNewPoint from '../view/add-new-point.js';
import {render} from '../render.js';

export default class BoardPresenter {
  NewItemListComponent = new NewItemList();
  EditPointComponent = new EditPoint();
  AddNewPointComponent = new AddNewPoint();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new NewItemList(), this.boardContainer);
  }
}
