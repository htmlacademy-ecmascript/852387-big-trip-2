import AbstractView from '../framework/view/abstract-view.js';
import { SortTypes } from '../const.js';
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
  const sortItemsTemplate = SortTypes.map((sortType) => createSortItemTemplate(sortType)).join('');
  return ` <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortItemsTemplate}
          </form>`;
}

export default class SortView extends AbstractView {

  get template() {
    return createSortTemplate();
  }
}
