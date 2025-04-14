import AbstractView from '../framework/view/abstract-view.js';

function createFailedLoaingTemplate() {
  return (
    `<p class="trip-events__msg">
      Failed to load latest route information
    </p>`);
}

export default class FailedLoadingView extends AbstractView {

  get template() {
    return createFailedLoaingTemplate();
  }
}
