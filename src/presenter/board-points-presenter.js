import PointListView from '../view/point-list-view';
import PointEditView from '../view/point-edit-view';
import PointAddView from '../view/point-add-view';
import PointView from '../view/point-view';
import { render } from '../render';

export default class BoardPointsPresenter {
  boardPointsComponent = new PointListView();
  pointListComponent = new PointListView();

  constructor({boardPointsContainer, pointsModel}) {
    this.boardPointsContainer = boardPointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    console.log(this.boardPoints);

    render(this.boardPointsComponent, this.boardPointsContainer);
    render(this.pointListComponent, this.boardPointsComponent.getElement());
    render(new PointAddView(), this.pointListComponent.getElement());
    render(new PointView(), this.pointListComponent.getElement());
    render(new PointEditView(), this.pointListComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i]}), this.pointListComponent.getElement());
    }
  }
}
