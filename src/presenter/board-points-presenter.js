import { render, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './point-presenter.js';
import { sortDatePointDown, sortPricePoint, sortTimeTrip } from '../utils/sort.js';
import { SortType, UpdateType, UserAction } from '../const.js';
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

    this.#pointsModel.addObserver(this.#handleModelEvent);
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

  //#handlePointChange = (updatedPoint) => {
  //this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#destinations, this.#offers);
  #handleViewAction = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this.#clearBoard({resetRenderedPointCount: true, resetSortType: true});
        this.#renderBoard();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
    //this.#clearPointList();
    //this.#renderPointList();
    this.#clearBoard({resetRenderedPointCount: true});
    this.#renderBoard();
  };

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#mainContainer);
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
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

  #clearBoard({resetSortType = false} = {}) {
    //const pointCount = this.points.length;

    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#noPointComponent);
    //remove(this.#loadMoreButtonComponent);

    // if (resetRenderedPointCount) {
    // this.#renderedPointCount = TASK_COUNT_PER_STEP;
    // } else {
    // На случай, если перерисовка доски вызвана
    // уменьшением количества задач (например, удаление или перенос в архив)
    // нужно скорректировать число показанных задач
    // this.#renderedPointCount = Math.min(pointCount, this.#renderedPointCount);
    // }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderBoard() {
    render(this.#pointListComponent, this.#mainContainer);
    const points = this.points;
    const pointCount = points.length;

    if (pointCount === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointList();
    //render(this.#pointListComponent, this.#mainContainer);

    // Теперь, когда #renderBoard рендерит доску не только на старте,
    // но и по ходу работы приложения, нужно заменить
    // константу TASK_COUNT_PER_STEP на свойство #renderedTaskCount,
    // чтобы в случае перерисовки сохранить N-показанных карточек
    //this.#renderPoints(points.slice(0, Math.min(pointCount, this.#renderedPointCount)));
  }
}
