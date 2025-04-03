import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';

export default class PointPresenter {
  #pointListContainer = null; //listComponnet

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #destinations = null;
  #offers = null;

  constructor({pointListContainer}) {
    this.#pointListContainer = pointListContainer;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;


    this.#pointComponent = new PointView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
    });
    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onClick: this.#handleFormSubmit
    });

    //render(this.#pointComponent, this.#pointListContainer);
    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditComponent.element)) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }


  #replaceCardToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToCard() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleEditClick = () => {
    this.#replaceCardToForm();
  };

  #handleFormSubmit = () => {
    this.#replaceFormToCard();
  };
}
