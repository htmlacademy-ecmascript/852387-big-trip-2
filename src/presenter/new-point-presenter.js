import { remove, render, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import { UserAction, UpdateType } from '../const.js';
import { DEFAULT_POINT } from '../const.js';

//import { getNewEvent } from '../utils/utils.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #pointsModel = null;
  #cities = null;

  constructor({pointListContainer, pointsModel, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#cities = this.#pointsModel.getDestinationsName();
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }
    const point = DEFAULT_POINT;
    const fullDestination = this.#pointsModel.getDestinationById(point.destination);
    const offers = this.#pointsModel.offers;
    const destinations = this.#pointsModel.destinations;

    this.#pointEditComponent = new PointEditView({
      point,
      fullDestination,
      offers,
      destinations,
      cities: this.#cities,
      onDeleteClick: this.#handleDeleteClick,
      onFormSubmit: this.#handleFormSubmit,
      onCloseClick: () => {
        document.removeEventListener('keydown', this.#onEscKeyDown);
      }
    });

    render(this.#pointEditComponent, this.#pointListContainer.element, RenderPosition.AFTERBEGIN);

    //document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    //document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR, /// MAJOR ?
      update,
    );

    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  // #handleSubmit = () => {
  // this.#pointEditComponent.reset(this.#pointEditComponent);
  // };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
