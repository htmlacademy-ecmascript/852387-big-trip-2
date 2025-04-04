import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';
import { getCapitalizeWord } from '../utils/common.js';

function createSortItemTemplate(type) {
  return (`<div class="trip-sort__item  trip-sort__item--${type}" data-sort-type="${type}">
            <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort"
            value="sort-${type}">
            <label class="trip-sort__btn" for="sort-${type}">${getCapitalizeWord(type)}</label>
          </div>`
  );
}

function createSortTemplate() {
  const sortItemsTemplate = Object.entries(SortType).map(([sortType,]) => createSortItemTemplate(sortType.toLowerCase())).join('');
  return ` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
}

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;

    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'DIV') {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
