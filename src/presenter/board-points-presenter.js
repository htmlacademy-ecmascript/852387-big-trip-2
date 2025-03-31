import SortView from '../view/sort-view.js';
import PointListView from '../view/point-list-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';

export default class BoardPointsPresenter {
  #mainContainer = null;
  #pointsModel = null;

  #boardPointsComponent = new PointListView();

  #boardPoints = [];
  #destinations = [];
  #offers = [];

  constructor({container, pointsModel}) {
    this.#mainContainer = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.destinations];
    this.#offers = [...this.#pointsModel.offers];

    render(new SortView(), this.#mainContainer);

    render(this.#boardPointsComponent, this.#mainContainer);

    this.#boardPoints.forEach((point) => this.#renderPoint(point));

    // for (const point of this.#boardPoints) {
    // //  render(new PointView({point,destinations: this.#destinations, offers: this.#offers}), this.#boardPointsComponent.element);
    //   this.#renderPoint(point);
    // }
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

    render(pointComponent, this.#boardPointsComponent.element);
  }
}
