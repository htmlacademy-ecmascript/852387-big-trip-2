import { remove, render, RenderPosition } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import { UserAction, UpdateType } from '../const.js';
import { getNewPoint } from '../utils/point.js';

//import { getNewEvent } from '../utils/utils.js';

export default class NewPointPresenter {
  #pointListComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointEditComponent = null;
  #pointsModel = null;
  #cities = null;

  constructor({pointListComponent, pointsModel, onDataChange, onDestroy}) {
    this.#pointListComponent = pointListComponent;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#cities = this.#pointsModel.getDestinationsNames();
  }

  init() {
    const point = getNewPoint();
    const fullDestination = this.#pointsModel.getDestinationById(point.destination);
    const offers = this.#pointsModel.offers;
    const destinations = this.#pointsModel.destinations;

    this.#pointEditComponent = new PointEditView({
      point,
      fullDestination,
      destinations,
      offers,
      cities: this.#cities,
      onCloseClick: () => {
        document.removeEventListener('keydown', this.#onEscKeyDown);
      },
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#pointEditComponent, this.#pointListComponent.element, RenderPosition.AFTERBEGIN); //element

  }

  destroy () {
    this.#handleDestroy();
    document.removeEventListener('keydown', this.#onEscKeyDown);
    remove(this.#pointEditComponent);
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
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MAJOR, /// MINOR ?
      update,
    );

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #handleDeleteClick = () => {
    this.destroy();
    //document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
      //document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };
}
