import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
export default class BoardPointsPresenter {
  #mainContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #points = [];
  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();

  constructor({container, pointsModel}) {
    this.#mainContainer = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
  };

  #renderSort() {
    render(this.#sortComponent, this.#mainContainer);
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point, this.#destinations, this.#offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#mainContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    //this.#renderedPointCount = TASK_COUNT_PER_STEP;
    //remove(this.#loadMoreButtonComponent);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#mainContainer);
    this.#renderPoints();
  }

  #renderBoard() {
    render(this.#pointListComponent, this.#mainContainer);

    if (this.#points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
