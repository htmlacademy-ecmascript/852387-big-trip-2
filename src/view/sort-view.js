import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { getCapitalizeWord } from '../utils/common.js';

function createSortItemTemplate(type, currentSortType) {
  return (`<div class="trip-sort__item  trip-sort__item--${type}">
            <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
            value="sort-${type}" data-sort-type="${type}"
            ${type === 'offer' || type === 'event' ? 'disabled' : ''} ${type === currentSortType ? 'checked' : ''}>
            <label class="trip-sort__btn" for="sort-${type}">${getCapitalizeWord(type === 'offer' ? 'offers' : type)}</label>
          </div>`
  );
}

function createSortTemplate(currentSortType) {
  const sortItemsTemplate = Object.entries(SortType).map(([sortType,]) => createSortItemTemplate(sortType.toLowerCase(), currentSortType)).join('');
  return ` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
}

export default class SortView extends AbstractView {
  #currentSortType = null;
  #handleSortTypeChange = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
