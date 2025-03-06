import SortView from './view/sort-view.js';
import FilterView from './view/filter-view.js';
import {render} from './render.js';
import BoardPointsPresenter from './presenter/board-points-presenter.js';
import PointsModel from './model/point-model.js';

const body = document.body;

const siteHeaderElement = body.querySelector('.page-header');
const tripControlFilter = siteHeaderElement.querySelector('.trip-controls__filters');

render(new FilterView(), tripControlFilter);

const siteMainElement = document.querySelector('.page-main');
const containerTripEvents = siteMainElement.querySelector('.trip-events');

render(new SortView(), containerTripEvents);

const pointsModel = new PointsModel();
const boardPointsPresenter = new BoardPointsPresenter({
  boardPointsContainer: containerTripEvents,
  pointsModel,
});

boardPointsPresenter.init();


// render(new PointListView(), containerTripEvents);

// const listTripEvents = siteMainElement.querySelector('.trip-events__list');

// render(new PointEditView(), listTripEvents);

// render(new PointAddView(), listTripEvents);


