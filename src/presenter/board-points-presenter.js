import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { sortDatePointDown, sortPricePoint, sortTimeTrip } from '../utils/sort.js';
import { SortType } from '../const.js';
export default class BoardPointsPresenter {
  #mainContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = null;
  #noPointComponent = new NoPointView();

  #destinations = [];
  #offers = [];
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({container, pointsModel}) {
    this.#mainContainer = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    this.#renderBoard();
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#pointsModel.points].sort(sortDatePointDown);
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortPricePoint);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortTimeTrip);
    }
    return this.#pointsModel.points;
  }


  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

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
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#mainContainer);
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#mainContainer);
    this.#renderPoints();
  }

  #renderBoard() {
    render(this.#pointListComponent, this.#mainContainer);

    if (this.points.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
  }
}
