import PointListView from '../view/point-list-view';
import PointEditView from '../view/point-edit-view';
import PointAddView from '../view/point-add-view';
import PointView from '../view/point-view';
import { render } from '../render';

export default class BoardPointsPresenter {
  boardPointsComponent = new PointListView();
  pointListComponent = new PointListView();

  constructor({boardPointsContainer, pointsModel}) {
    //console.log('pointsModl=', pointsModel);
    this.boardPointsContainer = boardPointsContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(this.boardPointsComponent, this.boardPointsContainer);
    render(this.pointListComponent, this.boardPointsComponent.getElement());
    render(new PointAddView(), this.pointListComponent.getElement());
    render(new PointView({point: this.boardPoints[0]}), this.pointListComponent.getElement());
    render(new PointEditView(), this.pointListComponent.getElement());

    //console.log(this.boardPoints.length);

    for (let i = 1; i < this.boardPoints.length; i++) {
      //console.log('i=', i);
      //console.log(this.pointListComponent.getElement());
      render(new PointView({point: this.boardPoints[i]}), this.pointListComponent.getElement());
      //console.log(this.boardPoints[i]);
    }
  }
}
