
import { render, remove, RenderPosition } from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import SortView from '../view/sort-view.js';
import NewPointButtonView from '../view/new-point-button-view.js';
import PointListView from '../view/point-list-view.js';
import NoPointView from '../view/no-point-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { sortDate, sortPrice, sortTime } from '../utils/sort.js';
//import { isPastPoint, isPesentPoint, isFurutePoint } from '../utils/point.js';
import { getFilterPoints } from '../utils/filter.js';
import { SortType, UpdateType, UserAction, FilterType, TimeLimit } from '../const.js';
import FailedLoadingView from '../view/failed-loading-view.js';

export default class BoardPointsPresenter {
  #destinations = null; //
  #pointsContainer = null; // eventsContainer
  #pointsModel = null; //
  #filterModel = null; //

  #pointListComponent = null; //
  #loadingComponent = new LoadingView(); //
  #sortComponent = null; //
  #noPointComponent = null; //
  #newPointBtnComponent = null; //
  #newPointBtnContainer = null; //

  //#offers = []; ??
  #infoPresenter = null; //
  #pointPresenters = new Map(); //
  #newPointPresenter = null; //
  #currentSortType = SortType.DAY; //
  #currentFilterType = FilterType.EVERYTHING;
  #isLoading = true; //
  #uiBlocker = null; //
  #failedLoadingComponent = null;

  constructor({container, pointsModel, filterModel, newPointBtnContainer, headerInfoPresenter}) {
    this.#pointsContainer = container;
    this.#newPointBtnContainer = newPointBtnContainer;
    this.#infoPresenter = headerInfoPresenter;
    this.#pointListComponent = new PointListView();
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#destinations = [...this.#pointsModel.destinations];
    // this.#newPointPresenter = new NewPointPresenter({
    // pointListContainer: this.#pointListComponent.element,
    // onDataChange: this.#handleViewAction,
    // onDestroy: onNewPointDestroy
    // });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#uiBlocker = new UiBlocker({ //
      lowerLimit: TimeLimit.LOWER_LIMIT,
      upperLimit: TimeLimit.UPPER_LIMIT
    });
  }

  get points() {
    this.#currentFilterType = this.#filterModel.filter;
    const filteredPoints = getFilterPoints(this.#pointsModel.points, this.#currentFilterType);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortDate);
      case SortType.PRICE:
        return filteredPoints.sort(sortPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortTime);
    }
    return filteredPoints;
  }


  init() {
    this.#newPointBtnComponent = new NewPointButtonView({ onClick: this.#newPointBtnClickHandler });
    //this.#currentSortType = SortType.DAY;
    //this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    //this.#clearBoard({resetSortType: true});
    // if (this.#noPointComponent) {
    // remove(this.#noPointComponent);
    // }
    //this.#newPointPresenter.init(this.destinations, this.offers);

    render(this.#newPointBtnComponent, this.#newPointBtnContainer);
    render(this.#pointListComponent, this.#pointsContainer);
    this.#renderPoints();
  }

  initSort() {
    if (!this.#sortComponent) {
      this.#sortComponent = new SortView({ onSortTypeChange: this.#handleSortChange });
      render(this.#sortComponent, this.#pointsContainer, RenderPosition.AFTERBEGIN);
    }
  }

  #activateNewPointBtn() {
    this.#newPointBtnComponent.activate();
  }

  #disableNewPointBtn() {
    this.#newPointBtnComponent.disable();
  }

  #createNewPoint = () => {

    if (!this.#newPointPresenter) {
      const newPointPresenter = new NewPointPresenter({
        listComponent: this.#pointListComponent,
        pointsModel: this.#pointsModel,
        destinations: this.#destinations,
        onDataChange: this.#handleViewAction,
        handleCloseClick: () => {
          this.#activateNewPointBtn();
          if (this.points.length === 0) {
            this.#clearNoPoint();
            this.#createNoPoint();
          }
        }
      });
      this.#newPointPresenter = newPointPresenter;
    }
    this.#newPointPresenter.init();
  };

  #resetSort() {
    this.#sortComponent?.resetSort();
    this.#currentSortType = SortType.DAY;
  }

  #resetPoints = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
    this.#newPointPresenter?.destroy();

  };

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#newPointPresenter?.destroy();
  }

  #createPoint(point) {

    const pointPresenter = new PointPresenter({
      listComponent: this.#pointListComponent,
      pointsModel: this.#pointsModel,
      destinations: this.#destinations,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#resetPoints,
    });

    this.#pointPresenters.set(point.id, pointPresenter);
    pointPresenter.init(point);

  }

  #createNoPoint() {
    this.#noPointComponent = new NoPointView(this.#filterModel.filter);
    render(this.#noPointComponent, this.#pointsContainer);
  }

  #renderPoints() {
    const points = this.points;
    if (this.#isLoading) {
      this.#disableNewPointBtn();
      this.#renderLoading();
      return;
    }
    if (points.length === 0) {
      this.#createNoPoint();
      remove(this.#sortComponent);
      this.#sortComponent = null;
    } else {
      this.initSort();
      points.forEach((point) => this.#createPoint(point));
    }
  }

  #renderLoading() {
    this.#loadingComponent = new LoadingView();
    render(this.#loadingComponent, this.#pointListComponent.element);   /// element
  }

  #renderFailedLoading() {
    this.#failedLoadingComponent = new FailedLoadingView();
    render(this.#failedLoadingComponent, this.#pointListComponent.element);     ///element
  }

  #clearLoading() {
    remove(this.#loadingComponent);
    this.#loadingComponent = null;
  }

  #clearNoPoint() {
    if (this.#noPointComponent) {
      remove(this.#noPointComponent);
      this.#noPointComponent = null;
    }
  }

  #desactivateNewPointBtn() {
    this.#newPointBtnComponent.desactivate();
  }

  #handleViewAction = (actionType, updateType, update) => {
    this.#uiBlocker.block();
    this.#desactivateNewPointBtn();

    switch (actionType) {
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        this.#pointsModel.addPoint(updateType, update).catch(() => {
          this.#newPointPresenter.setAborting();
        }).finally(() => {
          this.#uiBlocker.unblock();
          this.#activateNewPointBtn();
        });
        break;

      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();

        this.#pointsModel.deletePoint(updateType, update).catch(() => {
          this.#pointPresenters.get(update.id).setAborting();
        }).finally(() => {
          this.#uiBlocker.unblock();
          this.#activateNewPointBtn();

        });
        break;

      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();

        this.#pointsModel.updatePoint(updateType, update).catch(() => {
          this.#pointPresenters.get(update.id).setAborting();

        }).finally(() => {
          this.#uiBlocker.unblock();
          this.#activateNewPointBtn();

        });
        break;
    }

  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        this.#resetPoints();
        this.#activateNewPointBtn();
        break;

      case UpdateType.MINOR:

        this.#clearPointsList();
        this.#clearNoPoint();
        this.#renderPoints();
        break;

      case UpdateType.MAJOR:

        this.#clearPointsList();
        this.#clearNoPoint();
        this.initSort();
        this.#resetSort();
        this.#renderPoints();
        break;

      case UpdateType.INIT:

        this.#clearLoading();
        this.#activateNewPointBtn();
        this.#isLoading = false;
        this.initSort();
        this.#resetSort();
        this.#renderPoints();
        break;

      case UpdateType.FAILED:
        this.#clearLoading();
        this.#isLoading = false;
        this.#renderFailedLoading();
        break;
    }
    this.#infoPresenter.init(this.#pointsModel.points);


  };

  #handleSortChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderPoints();

  };

  #newPointBtnClickHandler = () => {
    this.#disableNewPointBtn();
    this.#resetPoints();
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#clearNoPoint();
    this.#createNewPoint();
  };
}
