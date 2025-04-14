import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { UserAction, UpdateType, Mode } from '../const.js';
import { isDatesEqual } from '../utils/point.js';

export default class PointPresenter {
  #listComponent = null; //listComponnet
  #handleModeChange = null; //
  #pointComponent = null; //
  #pointEditComponent = null; //editForm
  #pointsModel = null; //
  #handleDataChange = null;
  #point = null; //
  #mode = Mode.DEFAULT; //
  #cities = null; //

  constructor({listComponent, pointsModel, onDataChange, onModeChange}) {
    this.#listComponent = listComponent;
    this.#pointsModel = pointsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#cities = this.#pointsModel.getDestinationsNames();
  }

  init = (point) => {
    this.#point = point;
    const type = point.type;
    const fullDestination = this.#pointsModel.getDestinationById(point.destination);
    const fullOffers = this.#pointsModel.getOffersById(point.offers, type);
    const offers = this.#pointsModel.offers;
    const destinations = this.#pointsModel.destinations;


    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;


    this.#pointComponent = new PointView({
      point,
      fullDestination,
      fullOffers,
      onOpenClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointEditView({
      point,
      fullDestination,
      destinations,
      offers,
      cities: this.#cities,
      onFormClose: () => {
        this.#pointEditComponent.reset();
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#onEscKeyDown);
      },
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listComponent.element); //element
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано
    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy() {
    remove(this.#pointEditComponent);
    remove(this.#pointComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset();
      this.#replaceFormToCard();

      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }

    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

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


  #replaceCardToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToCard () {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleFormSubmit = (update) => {
    // Проверяем, поменялись ли в задаче данные, которые попадают под фильтрацию,
    // а значит требуют перерисовки списка - если таких нет, это PATCH-обновление
    const isMinorUpdate = (!isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
                          !isDatesEqual(this.#point.dateTo, update.dateTo))
                          || this.#point.basePrice !== update.basePrice;

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    document.removeEventListener('keydown', this.#onEscKeyDown);
    //this.#replaceFormToCard();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

}
