import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointAddView from '../view/point-add-view.js';
import PointView from '../view/point-view.js';
import { render } from '../framework/render.js';
import { DEFAULT_POINT } from '../mock/const.js';

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
    render(new PointAddView(DEFAULT_POINT, destinations, offers), this.boardPointsComponent.element);
    render(new PointEditView(points[2], destinations, offers), this.boardPointsComponent.element);

    for (const point of points) {
      render(new PointView(point, destinations, offers), this.boardPointsComponent.element);
    }
  }
}
