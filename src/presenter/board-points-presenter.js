import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import NoPointView from '../view/no-point-view.js';
export default class BoardPointsPresenter {
  #mainContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = new SortView();
  #noPointComponent = new NoPointView();

  #points = [];
  #destinations = [];
  #offers = [];

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

  #renderSort() {
    render(this.#sortComponent, this.#mainContainer);
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointView({
      point, destinations: this.#destinations, offers: this.#offers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
    });

    const pointEditComponent = new PointEditView({
      point, destinations: this.#destinations, offers: this.#offers,
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointListComponent.element);
  }

  #renderPoints() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#mainContainer);
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
