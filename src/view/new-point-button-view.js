import AbstractView from '../framework/view/abstract-view.js';

function createNewPointButtonTemplate() {
  return (`
    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">
      New event
    </button>`
  );
}

export default class NewPointButtonView extends AbstractView {

  constructor({onClick}) {
    super();
    this.element.addEventListener('click', onClick);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  disable() {
    this.element.disabled = true;
  }

  desactivate() {
    this.element.addEventListener('click', this.#newPointsButtonCLickHandler);
  }

  activate() {
    this.element.disabled = false;
    this.element.removeEventListener('click', this.#newPointsButtonCLickHandler);

  }

  #newPointsButtonCLickHandler(evt) {
    evt.preventDefault();
  }

  // #clickHandler = (evt) => {
  // evt.preventDefault();
  // this.#handleClick();
  // };
}
