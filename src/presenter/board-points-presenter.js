import PointListView from '../view/point-list-view';
import PointEditView from '../view/point-edit-view';
import PointAddView from '../view/point-add-view';
import PointView from '../view/point-view';
import { render } from '../render';
import { getDefaultPoint } from '../mock/const';

export default class BoardPointsPresenter {
  constructor({container, pointsModel}) {
    this.mainContainer = container;
    this.boardPointsComponent = new PointListView();
    this.pointsModel = pointsModel;
  }

  init() {
    const points = this.pointsModel.getPoints();
    const destinations = this.pointsModel.getDestinations();
    const offers = this.pointsModel.getOffers();

    render(this.boardPointsComponent, this.mainContainer);
    render(new PointAddView(getDefaultPoint(), destinations, offers), this.boardPointsComponent.getElement());
    render(new PointEditView(points[2], destinations, offers), this.boardPointsComponent.getElement());

    for (const point of points) {
      render(new PointView(point, destinations, offers), this.boardPointsComponent.getElement());
    }
  }
}
